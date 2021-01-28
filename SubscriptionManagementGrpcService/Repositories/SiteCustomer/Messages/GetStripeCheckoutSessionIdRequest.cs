using System.Collections.Generic;

namespace SubscriptionManagementGrpcService.Repositories.SiteCustomer.Messages
{
    public class GetStripeCheckoutSessionIdRequest
    {
        public string UserDetailId { get; set; }
        public string CurrentUserId { get; set; }
        public string CancelUrl { get; set; }
        public string SuccessUrl { get; set; }
        public string PaymentMethodType { get; set; }
        public string Mode { get; set; }
        public List<CheckoutSessionLineItem> LineItems { get; set; }
    }

    public class CheckoutSessionLineItem
    {
        public string PriceId { get; set; }
        public int Quantity { get; set; }
    }
}
