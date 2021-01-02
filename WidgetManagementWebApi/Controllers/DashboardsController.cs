using MicroservicesProjectLibrary.Utilities;
using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WidgetManagementGrpcService;
using static WidgetManagementGrpcService.DashboardServices;

namespace WidgetManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardsController : ControllerBase
    {
        private readonly DashboardServicesClient _dashboardServicesClient;
        private readonly ILogger<DashboardsController> _logger;

        public DashboardsController(ILogger<DashboardsController> logger, DashboardServicesClient dashboardServicesClient)
        {
            _logger = logger;
            _dashboardServicesClient = dashboardServicesClient;
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ApiMessageResponseBase> Get(DashboardGetRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);
            request.CurrentUserId = resp.UserId;
            var getResult = await _dashboardServicesClient.DashboardGetAsync(request);
            
            resp.Data = new { getResult?.Dashboard };
            resp.Success = true;

            return resp;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Create")]
        public async Task<ApiMessageResponseBase> Create([FromBody] DashboardCreateRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            if(request?.Dashboard != null) request.Dashboard.DashboardId = Guid.NewGuid().GetUrlFriendlyString();

            resp.Data = new { (await _dashboardServicesClient.DashboardCreateAsync(request))?.Dashboard };
            resp.Success = true;

            return resp;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Update")]
        public async Task<ApiMessageResponseBase> Update([FromBody] DashboardUpdateRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _dashboardServicesClient.DashboardUpdateAsync(request))?.Dashboard };
            resp.Success = true;

            return resp;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("AddWidget")]
        public async Task<ApiMessageResponseBase> AddWidget([FromBody] DashboardAddWidgetRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.DashboardWidgetId = Guid.NewGuid().GetUrlFriendlyString();
            request.CurrentUserId = resp.UserId;

            resp.Data = new { (await _dashboardServicesClient.DashboardAddWidgetAsync(request))?.Dashboard };
            resp.Success = true;

            return resp;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("UpdateWidget")]
        public async Task<ApiMessageResponseBase> UpdateWidget([FromBody] DashboardUpdateWidgetRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _dashboardServicesClient.DashboardUpdateWidgetAsync(request))?.Dashboard };
            resp.Success = true;

            return resp;
        }


        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("RemoveWidget")]
        public async Task<ApiMessageResponseBase> RemoveWidget([FromBody] DashboardRemoveWidgetRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _dashboardServicesClient.DashboardRemoveWidgetAsync(request))?.Dashboard };
            resp.Success = true;

            return resp;
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Search")]
        public async Task<ApiMessageResponseBase> Search([FromQuery] DashboardSearchRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _dashboardServicesClient.DashboardSearchAsync(request))?.Dashboards };
            resp.Success = true;

            return resp;
        }


        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ApiMessageResponseBase> Delete([FromQuery] DashboardDeleteRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);
            
            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _dashboardServicesClient.DashboardDeleteAsync(request))?.Dashboard };
            resp.Success = true;

            return resp;
        }
    }
}
