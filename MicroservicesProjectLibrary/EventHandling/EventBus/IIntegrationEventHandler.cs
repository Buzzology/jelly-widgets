using MicroservicesProjectLibrary.EventHandling.Events;
using System.Threading.Tasks;

namespace MicroservicesProjectLibrary.EventHandling.EventBus
{
    public interface IIntegrationEventHandler<in TIntegrationEvent> : IIntegrationEventHandler where TIntegrationEvent : IntegrationEvent
    {
        Task Handle(TIntegrationEvent @event);
    }

    public interface IIntegrationEventHandler
    {

    }
}
