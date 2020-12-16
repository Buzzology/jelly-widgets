using MicroservicesProjectLibrary.EventHandling.Events;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.EventHandling
{
    public interface IWidgetManagementIntegrationEventService
    {
        Task PublishThroughEventBusAsync(IntegrationEvent evt);
    }
}