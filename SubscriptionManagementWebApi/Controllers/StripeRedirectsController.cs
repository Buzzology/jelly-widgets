using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using SubscriptionManagementGrpcService;
using System.Collections.Generic;
using System.Threading.Tasks;
using static SubscriptionManagementGrpcService.SiteCustomerServices;


namespace SubscriptionManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StripeRedirectsController : ControllerBase
    {
        private readonly SiteCustomerServicesClient _siteCustomerServicesClient;
        private readonly ILogger<StripeRedirectsController> _logger;

        public StripeRedirectsController(ILogger<StripeRedirectsController> logger, SiteCustomerServicesClient siteCustomerServicesClient)
        {
            _logger = logger;
            _siteCustomerServicesClient = siteCustomerServicesClient;
        }


        [HttpPost("AccountManagementPortal")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ApiMessageResponseBase> AccountManagementPortal(string returnUrl)
        {
            var resp = new ApiMessageResponseBase(this?.User) { Success = true };
            var getSessionResponse = await _siteCustomerServicesClient.SiteCustomerGetAccountManagementUrlAsync(
                new SiteCustomerGetAccountManagementUrlRequest
                {
                    UserDetailId = resp.UserId,
                    ReturnUrl = returnUrl ?? $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}"
                });

            resp.Success = true;
            resp.Data = new { getSessionResponse.RedirectUrl };

            return resp;
        }


        [HttpPost("CheckoutPortal")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ApiMessageResponseBase> CheckoutPortal([FromBody] List<LineItemDto> lineItems)
        {
            var resp = new ApiMessageResponseBase(this?.User) { Success = true };

            // Setup request
            var getSessionRequest = new SiteCustomerGetCheckoutSessionRequest();
            getSessionRequest.UserDetailId = resp.UserId;
            getSessionRequest.Mode = "subscription";
            getSessionRequest.PaymentMethodType = "card";
            getSessionRequest.LineItems.AddRange(lineItems);

            // Get the session id
            var getSessionResponse = await _siteCustomerServicesClient.SiteCustomerGetCheckoutSessionAsync(getSessionRequest);

            resp.Success = true;
            resp.Data = new { getSessionResponse?.SessionId };

            return resp;
        }
    }
}