using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.EventHandling.EventBus.RabbitMQ;
using MicroservicesProjectLibrary.EventHandling.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using System;
using System.Data.Common;

namespace MicroservicesProjectLibrary.Utilities.Startup
{
    public static class RabbitMqServiceLoaderExtension
    {
        public static void SetRabbitMqServiceAndConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IRabbitMQPersistentConnection>(serviceProvider =>
            {
                var logger = serviceProvider.GetRequiredService<ILogger<DefaultRabbitMQPersistentConnection>>();

                if (string.IsNullOrEmpty(configuration["EventBusConnection"])) throw new ArgumentException("EventBusConnection is required.");
                if (string.IsNullOrEmpty(configuration["EventBusUserName"])) throw new ArgumentException("EventBusUsername is required.");
                if (string.IsNullOrEmpty(configuration["EventBusPassword"])) throw new ArgumentException("EventBusPassword is required.");

                var factory = new ConnectionFactory() {
                    HostName = configuration["EventBusConnection"],
                    DispatchConsumersAsync = true,
                    UserName = configuration["EventBusUserName"],
                    Password = configuration["EventBusPassword"],
                };

                var retryCount = 5;
                if (!string.IsNullOrEmpty(configuration["EventBusRetryCount"]))
                {
                    retryCount = int.Parse(configuration["EventBusRetryCount"]);
                }

                return new DefaultRabbitMQPersistentConnection(factory, logger, retryCount);
            });

            var subscriptionClientName = configuration["SubscriptionClientName"];
            services.AddSingleton<IEventBus, EventBusRabbitMQ>(serviceProvider =>
            {
                var rabbitMQPersistentConnection = serviceProvider.GetRequiredService<IRabbitMQPersistentConnection>();
                var logger = serviceProvider.GetRequiredService<ILogger<EventBusRabbitMQ>>();
                var eventBusSubscriptionsManager = serviceProvider.GetRequiredService<IEventBusSubscriptionsManager>();

                var retryCount = 5;
                if (!string.IsNullOrEmpty(configuration["EventBusRetryCount"]))
                {
                    retryCount = int.Parse(configuration["EventBusRetryCount"]);
                }

                return new EventBusRabbitMQ(rabbitMQPersistentConnection, logger, retryCount, eventBusSubscriptionsManager, serviceProvider, subscriptionClientName);
            });

            services.AddSingleton<IEventBusSubscriptionsManager, InMemoryEventBusSubscriptionsManager>();
            services.AddTransient<Func<DbConnection, IIntegrationEventLogService>>(sp => (DbConnection c) => new IntegrationEventLogService(c));
        }
    }
}
