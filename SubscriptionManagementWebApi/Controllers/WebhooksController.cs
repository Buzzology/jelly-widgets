using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SubscriptionManagementWebApi.Controllers
{
    public class WebhooksController : Controller
    {
        public string ApiKey { get; init; } = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
        public string WebhookSecret { get; init; } = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";

        [HttpPost("stripe-webhook")]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent;

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

            if (stripeEvent.Type == "invoice.paid")
            {
                // Used to provision services after the trial has ended.
                // The status of the invoice will show up as paid. Store the status in your
                // database to reference when a user accesses your service to avoid hitting rate
                // limits.
            }

            if (stripeEvent.Type == "invoice.payment_failed")
            {
                // If the payment fails or the customer does not have a valid payment method,
                // an invoice.payment_failed event is sent, the subscription becomes past_due.
                // Use this webhook to notify your user that their payment has
                // failed and to retrieve new card details.
            }

            if (stripeEvent.Type == "customer.subscription.deleted")
            {
                // handle subscription cancelled automatically based
                // upon your subscription settings. Or if the user cancels it.
            }

            return Ok();
        }
    }
}
