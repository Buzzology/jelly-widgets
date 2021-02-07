using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.StripeEventLog
{
    public interface IStripeEventLogRepository
    {
        Task ProcessStripeEvent(string payload, string stripeSignature);
    }
}
