using RabbitMQ.Client;
using System;

namespace MicroservicesProjectLibrary.EventHandling.EventBus
{
    public interface IRabbitMQPersistentConnection : IDisposable
    {
        bool IsConnected { get; }

        bool TryConnect();

        IModel CreateModel();
    }
}
