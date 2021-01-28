using MicroservicesProjectLibrary.EventHandling.Events;
using MicroservicesProjectLibrary.EventHandling.Services;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Polly;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using System;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace MicroservicesProjectLibrary.EventHandling.EventBus.RabbitMQ
{
    public class EventBusRabbitMQ : IEventBus, IDisposable
    {
        const string BROKER_NAME = "microservices_project";

        private readonly IRabbitMQPersistentConnection _persistentConnection;
        private readonly ILogger<EventBusRabbitMQ> _logger;
        private readonly int _retryCount;
        private IModel _consumerChannel;
        private string _queueName;
        IEventBusSubscriptionsManager _subsManager;
        IServiceProvider _serviceProvider;
        IServiceScopeFactory _scopeFactory { get; init; }

        public EventBusRabbitMQ(IRabbitMQPersistentConnection persistentConnection, ILogger<EventBusRabbitMQ> logger, int retryCount, IEventBusSubscriptionsManager subsManager, IServiceProvider serviceProvider, string queueName = "")
        {
            _persistentConnection = persistentConnection;
            _logger = logger;
            _retryCount = retryCount;
            _queueName = queueName;
            _consumerChannel = CreateConsumerChannel();
            _subsManager = subsManager ?? new InMemoryEventBusSubscriptionsManager();
            _subsManager.OnEventRemoved += SubsManager_OnEventRemoved;
            _serviceProvider = serviceProvider;
            _scopeFactory = serviceProvider.GetService<IServiceScopeFactory>();
        }


        public async void Publish(IntegrationEvent @event)
        {
            if (!_persistentConnection.IsConnected)
            {
                _persistentConnection.TryConnect();
            }

            var policy = Policy.Handle<BrokerUnreachableException>()
                .Or<SocketException>()
                .WaitAndRetry(_retryCount,
                retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                (e, time) => {
                    _logger.LogWarning(e, $"Could not publish event: {@event.Id} after {time.TotalSeconds:n1}s ({e.Message})");
                });

            var eventName = @event.GetType().Name;

            _logger.LogTrace($"Creating RabbitMQ channel to publish event: {@event.Id} ({eventName})");

            using(var channel = _persistentConnection.CreateModel())
            {
                _logger.LogTrace($"Declaring RabbitMQ exchange to publish event: {@event.Id}");

                channel.ExchangeDeclare(exchange: BROKER_NAME, type: "direct");

                var message = JsonConvert.SerializeObject(@event);
                var body = Encoding.UTF8.GetBytes(message);

                policy.Execute(() =>
                {                    
                    var properties = channel.CreateBasicProperties();
                    properties.DeliveryMode = 2; // Persistent, any other number is transient

                    _logger.LogTrace($"Publishing event to RabbitMQ: {@event.Id}");

                    channel.BasicPublish(
                        exchange: BROKER_NAME,
                        routingKey: eventName,
                        mandatory: true, // If the message cannot be routed it is sent back to the sender instead of being dropped
                        basicProperties: properties,
                        body: body
                    );
                });
            }
        }


        public void Dispose()
        {
            if(_consumerChannel != null)
            {
                _consumerChannel.Dispose();
            }

            _subsManager.Clear();
        }


        public void Subscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>
        {
            var eventName = _subsManager.GetEventKey<T>();
            DoInternalSubscription(eventName);

            _logger.LogInformation("Subscribing to event {EventName} with {EventHandler}", eventName, typeof(TH).GetGenericTypeName());

            _subsManager.AddSubscription<T, TH>();
            StartBasicConsume();
        }


        private void DoInternalSubscription(string eventName)
        {
            var containsKey = _subsManager.HasSubscriptionsForEvent(eventName);
            if (!containsKey)
            {
                if (!_persistentConnection.IsConnected)
                {
                    _persistentConnection.TryConnect();
                }

                using (var channel = _persistentConnection.CreateModel())
                {
                    channel.QueueBind(
                        exchange: BROKER_NAME,
                        routingKey: eventName,
                        queue: _queueName
                    );
                }
            }
        }


        private IModel CreateConsumerChannel()
        {
            if (!_persistentConnection.IsConnected)
            {
                _persistentConnection.TryConnect();
            }

            _logger.LogTrace($"Creating RabbitMQ consumer channel.");

            var channel = _persistentConnection.CreateModel();
            _logger.LogTrace($"TEMP MODEL CREATED.");
            _logger.LogTrace($"_queueName.{_queueName}");

            channel.ExchangeDeclare(exchange: BROKER_NAME, type: "direct");
            channel.QueueDeclare(
                queue: _queueName,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );

            _logger.LogTrace($"QUEUE DECLARED.");

            channel.CallbackException += (sender, e) =>
            {
                _logger.LogWarning(e.Exception, "Recreating RabbitMQ consumer channel");
                _consumerChannel.Dispose();
                _consumerChannel = CreateConsumerChannel();
                StartBasicConsume();
            };

            return channel;
        }


        private void StartBasicConsume()
        {
            _logger.LogTrace($"Starting RabbitMQ basic consume");

            if(_consumerChannel != null)
            {
                var consumer = new AsyncEventingBasicConsumer(_consumerChannel);

                consumer.Received += Consumer_Received;

                _consumerChannel.BasicConsume(
                    queue: _queueName,
                    autoAck: false,
                    consumer: consumer);
            }
            else
            {
                _logger.LogError($"StartingBasicConsume can't call on _consumerChannel == null");
            }
        }


        private async Task Consumer_Received(object sender, BasicDeliverEventArgs eventArgs)
        {
            var eventName = eventArgs.RoutingKey;
            var message = Encoding.UTF8.GetString(eventArgs.Body.ToArray());

            try
            {
                await ProcessEvent(eventName, message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"----- ERROR processing message {message}");
            }

            // Take message off queue. NOTE: eShop says that this should be handled by dead letter exchange in the case of an execption: https://www.rabbitmq.com/dlx.html 
            _consumerChannel.BasicAck(eventArgs.DeliveryTag, multiple: false);
        }


        private async Task ProcessEvent(string eventName, string message)
        {
            _logger.LogTrace($"Processing RabbitMQ event: {eventName}");

            if (_subsManager.HasSubscriptionsForEvent(eventName))
            {
                var subscriptions = _subsManager.GetHandlersForEvent(eventName);
                foreach(var subscription in subscriptions)
                {
                    if (subscription.IsDynamic)
                    {
                        // NOTE: in eshop this uses autofac
                        var handler = _serviceProvider.GetService(subscription.HandlerType) as IDynamicIntegrationEventHandler;
                        if (handler == null) continue;

                        dynamic eventData = JObject.Parse(message);

                        await Task.Yield(); // Forces it to not be run synchronously
                        await handler.Handle(eventData);
                    } 
                    else
                    {
                        // Added this because I was unable to resolve scoped services in the singleton (this class): https://stackoverflow.com/a/55381457/522859
                        using (var scope = _scopeFactory.CreateScope())
                        {
                            var handler = scope.ServiceProvider.GetService(subscription.HandlerType);
                            if (handler == null)
                            {
                                _logger.LogWarning($"No handler for RabbitMQ event: {eventName}. {nameof(subscription.HandlerType)}: {subscription.HandlerType}");
                                continue;
                            }

                            var eventType = _subsManager.GetEventTypeByName(eventName);
                            var integrationEvent = JsonConvert.DeserializeObject(message, eventType);
                            var concreteType = typeof(IIntegrationEventHandler<>).MakeGenericType(eventType);

                            await Task.Yield();
                            await (Task)concreteType.GetMethod("Handle").Invoke(handler, new object[] { integrationEvent });
                        }
                    }
                }
            }
            else
            {
                _logger.LogWarning($"No subscription for RabbitMQ event: {eventName}");
            }
        }


        private void SubsManager_OnEventRemoved(object sender, string eventName)
        {
            if (!_persistentConnection.IsConnected) _persistentConnection.TryConnect();
            
            using(var channel = _persistentConnection.CreateModel())
            {
                channel.QueueUnbind(
                    queue: _queueName,
                    exchange: BROKER_NAME,
                    routingKey: eventName
                );

                if (_subsManager.IsEmpty)
                {
                    _queueName = string.Empty;
                    _consumerChannel.Close();
                }
            }
        }        
    }
}
