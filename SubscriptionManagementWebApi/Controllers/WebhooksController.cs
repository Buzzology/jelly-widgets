using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Threading.Tasks;
using static StripeEventLogManagementGrpcService.StripeEventLogServices;

namespace SubscriptionManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebhooksController : ControllerBase
    {
        public string ApiKey { get; init; } = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
        public string WebhookSecret { get; init; } = "whsec_542IgQFtoDM2gpoEkGUCRRRc1uCKtrtE";
        private readonly StripeEventLogServicesClient _stripeEventLogServicesClient;
        private readonly ILogger<StripeRedirectsController> _logger;

        public WebhooksController(
            StripeEventLogServicesClient stripeEventLogServicesClient,
            ILogger<StripeRedirectsController> logger
            )
        {
            _stripeEventLogServicesClient = stripeEventLogServicesClient;
            _logger = logger;
        }

        [HttpPost]
        [Route("stripe")]
        public async Task<IActionResult> Stripe()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

           await _stripeEventLogServicesClient.StripeEventLogProcessAsync(
                new StripeEventLogManagementGrpcService.StripeEventLogProcessRequest
                {
                    Payload = json,
                    StripeSignature = Request.Headers["Stripe-Signature"]
                });

            return Ok();
        }
    }
}
