using MicroservicesProjectLibrary.EventHandling.Events;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.EventHandling
{
    public interface ISubscriptionManagementIntegrationEventService
    {
        Task SaveEventAndContentManagementContextChangesAsync(IntegrationEvent evt);
        Task PublishThroughEventBusAsync(IntegrationEvent evt);
    }
}