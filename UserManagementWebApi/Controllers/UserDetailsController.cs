using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using static UserManagementGrpcService.UserDetailServices;
using System;
using UserManagementGrpcService;

namespace UserManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDetailsController : Controller
    {
        private readonly ILogger<UserDetailsController> _logger;
        private readonly UserDetailServicesClient _userDetailsServicesClient;

        public UserDetailsController(ILogger<UserDetailsController> logger, UserDetailServicesClient userDetailsServicesClient)
        {
            _logger = logger;
            _userDetailsServicesClient = userDetailsServicesClient;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Validate")]
        public async Task<ApiMessageResponseBase> Validate()
        {
            var resp = new ApiMessageResponseBase(this?.User) { Success = true };

            try
            {
                if (!string.IsNullOrWhiteSpace(resp.UserId))
                {
                    var user = (await _userDetailsServicesClient.UserDetailGetAsync(
                            new UserDetailGetRequest
                            {
                                UserDetailId = resp.UserId
                            }))?.UserDetail;

                    if (user == null)
                    {
                        // Create the user
                        var createUserResp = await _userDetailsServicesClient.UserDetailCreateAsync(
                            new UserDetailCreateRequest
                            {
                                UserDetail = new UserDetailDto
                                {
                                    UserDetailId = resp.UserId,
                                    EmailAddress = resp.EmailAddress,
                                    DisplayName = resp.Nickname,
                                    ExternalReferenceId = resp.UserId
                                },
                            });
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
            }

            return resp;
        }
    }
}
