using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SubscriptionManagementGrpcService;
using System.Threading.Tasks;
using static SubscriptionManagementGrpcService.SubscriptionServices;

namespace SubscriptionManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly SubscriptionServicesClient _subscriptionServicesClient;
        private readonly ILogger<SubscriptionsController> _logger;

        public SubscriptionsController(
            SubscriptionServicesClient subscriptionServicesClient,
            ILogger<SubscriptionsController> logger
            )
        {
            _subscriptionServicesClient = subscriptionServicesClient;
            _logger = logger;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Search")]
        public async Task<ApiMessageResponseBase> Search([FromBody] SubscriptionSearchRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.UserDetailId = resp.UserId;

            resp.Data = new { (await _subscriptionServicesClient.SubscriptionSearchAsync(request)).Subscriptions };
            resp.Success = true;

            return resp;
        }
    }
}