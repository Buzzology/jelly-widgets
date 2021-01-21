using Newtonsoft.Json;

namespace SubscriptionManagementData.Models.Stripe
{
    public class CreateCheckoutSessionRequest
    {
        [JsonProperty("priceId")]
        public string PriceId { get; set; }
    }
}
