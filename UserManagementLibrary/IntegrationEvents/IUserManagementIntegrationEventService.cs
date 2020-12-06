using MicroservicesProjectLibrary.EventHandling.Events;
using System.Threading.Tasks;

namespace UserManagementLibrary.IntegrationEvents
{
    public interface IUserManagementIntegrationEventService
    {
        Task SaveEventAndContentManagementContextChangesAsync(IntegrationEvent evt);
        Task PublishThroughEventBusAsync(IntegrationEvent evt);
    }
}