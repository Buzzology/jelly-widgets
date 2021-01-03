using MicroservicesProjectLibrary.Utilities;
using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WidgetManagementGrpcService;
using static WidgetManagementGrpcService.WidgetServices;

namespace WidgetManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WidgetsController : ControllerBase
    {
        private readonly WidgetServicesClient _widgetServicesClient;
        private readonly ILogger<WidgetsController> _logger;

        public WidgetsController(ILogger<WidgetsController> logger, WidgetServicesClient widgetServicesClient)
        {
            _logger = logger;
            _widgetServicesClient = widgetServicesClient;
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ApiMessageResponseBase> Get(WidgetGetRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);
            request.CurrentUserId = resp.UserId;
            var getResult = await _widgetServicesClient.WidgetGetAsync(request);
            
            resp.Data = new { getResult?.Widget };
            resp.Success = true;

            return resp;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Create")]
        public async Task<ApiMessageResponseBase> Create([FromBody] WidgetCreateRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            if(request?.Widget != null) request.Widget.WidgetId = Guid.NewGuid().GetUrlFriendlyString();

            resp.Data = new { (await _widgetServicesClient.WidgetCreateAsync(request))?.Widget };
            resp.Success = true;

            return resp;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Update")]
        public async Task<ApiMessageResponseBase> Update([FromBody] WidgetUpdateRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _widgetServicesClient.WidgetUpdateAsync(request))?.Widget };
            resp.Success = true;

            return resp;
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Search")]
        public async Task<ApiMessageResponseBase> Search([FromQuery] WidgetSearchRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);

            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _widgetServicesClient.WidgetSearchAsync(request))?.Widgets };
            resp.Success = true;

            return resp;
        }


        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ApiMessageResponseBase> Delete([FromQuery] WidgetDeleteRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);
            
            request.CurrentUserId = resp.UserId;
            resp.Data = new { (await _widgetServicesClient.WidgetDeleteAsync(request))?.Widget };
            resp.Success = true;

            return resp;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ProcessMessage")]
        public async Task<ApiMessageResponseBase> ProcessMessage([FromBody] WidgetProcessMessageRequest request)
        {
            var resp = new ApiMessageResponseBase(this?.User);
            request.CurrentUserId = resp.UserId;

            var grpcResp = await _widgetServicesClient.WidgetProcessMessageAsync(request);
            resp.Data = new { 
                grpcResp?.PayloadId,
                grpcResp?.PayloadResponses,
                grpcResp?.Generated,
            };
            resp.Success = true;

            return resp;
        }
    }
}
