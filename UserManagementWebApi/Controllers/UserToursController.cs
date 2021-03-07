using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Threading.Tasks;
using UserTourGrpcService;
using static UserTourGrpcService.UserTourServices;

namespace UserManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserToursController : ControllerBase
    {
        private readonly UserTourServicesClient _userTourServicesClient;
        private readonly ILogger<UserToursController> _logger;

        public UserToursController(
            UserTourServicesClient userTourServicesClient,
            ILogger<UserToursController> logger
            )
        {
            _userTourServicesClient = userTourServicesClient;
            _logger = logger;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Search")]
        public async Task<ApiMessageResponseBase> Search([FromBody] UserTourSearchRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;

            resp.Data = new { (await _userTourServicesClient.UserTourSearchAsync(request)).UserTours };
            resp.Success = true;

            return resp;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Create")]
        public async Task<ApiMessageResponseBase> Create([FromBody] UserTourCreateRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;

            resp.Data = new { (await _userTourServicesClient.UserTourCreateAsync(request))?.UserTour };
            resp.Success = true;

            return resp;
        }
    }
}
