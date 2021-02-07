using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static SubscriptionManagementGrpcService.SubscriptionServices;

namespace SubscriptionManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebhooksController : ControllerBase
    {
        public string ApiKey { get; init; } = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
        public string WebhookSecret { get; init; } = "whsec_542IgQFtoDM2gpoEkGUCRRRc1uCKtrtE";
        private readonly SubscriptionServicesClient _subscriptionServicesClient;
        private readonly ILogger<StripeRedirectsController> _logger;

        public WebhooksController(
            SubscriptionServicesClient subscriptionServicesClient,
            ILogger<StripeRedirectsController> logger
            )
        {
            _subscriptionServicesClient = subscriptionServicesClient;
            _logger = logger;
        }

        [HttpGet]
        [Route("test")]
        public async Task<string> Test()
        {
            return "Working";
        }

        [HttpPost]
        [Route("stripe")]
        public async Task<IActionResult> Stripe()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent;

            var signature = Request.Headers["Stripe-Signature"];

            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    WebhookSecret
                );
                Console.WriteLine($"Webhook notification with type: {stripeEvent.Type} found for {stripeEvent.Id}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Something failed {e}");
                return BadRequest();
            }

            switch (stripeEvent.Type)
            {
                case "customer.subscription.created":
                    {
                        // Log the event


                        // TODO: Check if the subscription already exists
                        // TODO: If it doesn't exist create the subscription
                        // TODO: If it does exist update relevant properties
                        break;
                    }

                case "customer.subscription.updated":
                    {
                        //var subscription = 
                        // TODO: Check if the subscription already exists
                        // TODO: If it doesn't exist create the subscription
                        // TODO: If it does exist update relevant properties
                        break;
                    }
            }

            if (stripeEvent.Type == "invoice.paid")
            {
                // TODO: (CJO) To send them a notification that their subscription has been automatically renewed
                // Used to provision services after the trial has ended.
                // The status of the invoice will show up as paid. Store the status in your
                // database to reference when a user accesses your service to avoid hitting rate
                // limits.
            }

            if (stripeEvent.Type == "invoice.payment_failed")
            {
                // TODO: (CJO) THis is for if the subscription renewal fails
                // If the payment fails or the customer does not have a valid payment method,
                // an invoice.payment_failed event is sent, the subscription becomes past_due.
                // Use this webhook to notify your user that their payment has
                // failed and to retrieve new card details.
            }

            if (stripeEvent.Type == "customer.subscription.deleted")
            {
                // (CJO) I don't think we need to handle this. It will just expire once the period ends.
                // handle subscription cancelled automatically based
                // upon your subscription settings. Or if the user cancels it.
            }

            return Ok();
        }
    }
}
