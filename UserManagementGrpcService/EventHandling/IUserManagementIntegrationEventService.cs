using MicroservicesProjectLibrary.EventHandling.Events;
using System.Threading.Tasks;

namespace UserManagementGrpcService.EventHandling
{
    public interface IUserManagementIntegrationEventService
    {
        Task SaveEventAndContentManagementContextChangesAsync(IntegrationEvent evt);
        Task PublishThroughEventBusAsync(IntegrationEvent evt);
    }
}