using MicroservicesProjectLibrary.EventHandling.Events;

namespace MicroservicesProjectLibrary.EventHandling.EventBus
{
    public interface IEventBus
    {
        void Publish(IntegrationEvent @event);
        void Subscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>;
    }
}
