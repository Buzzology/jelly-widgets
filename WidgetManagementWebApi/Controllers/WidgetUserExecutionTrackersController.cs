using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using WidgetManagementGrpcService;
using static WidgetManagementGrpcService.WidgetUserExecutionTrackerServices;

namespace WidgetManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WidgetUserExecutionTrackersController : ControllerBase
    {
        private readonly WidgetUserExecutionTrackerServicesClient _widgetUserExecutionTrackerServicesClient;
        private readonly ILogger<WidgetUserExecutionTrackersController> _logger;

        public WidgetUserExecutionTrackersController(ILogger<WidgetUserExecutionTrackersController> logger, WidgetUserExecutionTrackerServicesClient widgetUserExecutionTrackerServicesClient)
        {
            _logger = logger;
            _widgetUserExecutionTrackerServicesClient = widgetUserExecutionTrackerServicesClient;
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ApiMessageResponseBase> Get()
        {
            var resp = new ApiMessageResponseBase(this?.User);
            var request = new WidgetUserExecutionTrackerGetCurrentOrCreateRequest { UserDetailId = resp.UserId };
            var getResult = await _widgetUserExecutionTrackerServicesClient.WidgetUserExecutionTrackerGetCurrentOrCreateAsync(request);
            
            resp.Data = new { getResult?.WidgetUserExecutionTracker };
            resp.Success = true;

            return resp;
        }
    }
}
