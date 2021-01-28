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
        public async Task<ApiMessageResponseBase> AccountManagementPortal()
        {
            var resp = new ApiMessageResponseBase(this?.User) { Success = true };

            // TODO: Check if there is a stripe customer id available

            // TODO: If there's not a stripe customer id avaiablle
            // Create the customer
            var customerCreateOptions = new CustomerCreateOptions
            {
                Email = resp.EmailAddress,
                Name = resp.Nickname,
            };
            var service = new CustomerService();
            var customer = service.Create(customerCreateOptions);
            var options = new Stripe.BillingPortal.SessionCreateOptions
            {
                Customer = customer.Id,
                ReturnUrl = "https://localhost:3000/payments2",
            };
            var sessionService = new Stripe.BillingPortal.SessionService();
            var session = sessionService.Create(options);

            resp.Success = true;
            resp.Data = new { redirectUrl = session.Url };

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


        //[HttpPost("CheckoutPortal")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<ApiMessageResponseBase> CheckoutPortal([FromBody] CreateCheckoutSessionRequest req)
        //{
        //    var resp = new ApiMessageResponseBase(this?.User) { Success = true };

        //    // Retrieve the customer
        //    var searchRequest = new SubscriptionManagementGrpcService.SiteCustomerSearchRequest();
        //    searchRequest.UserDetailIds.Add(resp.UserId);
        //    var siteCustomer = (await _siteCustomerServicesClient.SiteCustomerSearchAsync(searchRequest)).SiteCustomers?.First();

        //    if (siteCustomer == null) throw new ArgumentException($"No {nameof(siteCustomer)} for {resp.UserId}");
        //    var externalCustomerId = siteCustomer?.ExternalCustomerId;


        //    // TODO: If there's not a stripe customer id avaiablle


        //    var checkoutCreateOptions = new Stripe.Checkout.SessionCreateOptions {
        //        // See https://stripe.com/docs/api/checkout/sessions/create
        //        // for additional parameters to pass.
        //        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        //        // the actual Session ID is returned in the query parameter when your customer
        //        // is redirected to the success page.
        //        SuccessUrl = "https://localhost:3000/payments/success?session_id={CHECKOUT_SESSION_ID}",
        //        CancelUrl = "https://localhost:3000/payments/cancelled",
        //        PaymentMethodTypes = new List<string>
        //        {
        //            "card",
        //        },
        //        Mode = "subscription",
        //        LineItems = new List<SessionLineItemOptions>
        //        {
        //            new SessionLineItemOptions
        //            {
        //                Price = req.PriceId,
        //                // For metered billing, do not pass quantity
        //                Quantity = 1,
        //            },
        //        },
        //    };

        //    // TODO: move client creation into construction and move secret key to config
        //    var sessionService = new Stripe.Checkout.SessionService(new StripeClient("sk_test_51IARDTB2aL3Fzklyc2zgidxLLf6altYutf5JEQPJh8Hsg7Mj3k1GE1ca1VLinqHTVDFB626bmRuxxr01kZYCLPMg00ME9noJO7"));

        //    try
        //    {
        //        var session = await sessionService.CreateAsync(checkoutCreateOptions);
        //        resp.Data = new { SessionId = session.Id };
        //        resp.Success = true;

        //        return resp;
        //    }
        //    catch (StripeException e)
        //    {
        //        Console.WriteLine(e.StripeError.Message);
        //        resp.Success = false;
        //        resp.AddError($"An error has occurred: {e.StripeError.Message}");
        //        return resp;
        //    }
        //}
    }
}