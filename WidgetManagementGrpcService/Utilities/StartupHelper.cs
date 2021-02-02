using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using UserManagementIntegrationEvents.UserDetail;
using WidgetManagementGrpcService.EventHandling;
using WidgetManagementGrpcService.EventHandling.Dashboard;
using WidgetManagementGrpcService.EventHandling.WidgetExecutionTracker;
using WidgetManagementGrpcService.Repositories.Dashboard;
using WidgetManagementGrpcService.Repositories.Widget;
using WidgetManagementGrpcService.Repositories.WidgetUserExecutionTracker;
using WidgetManagementGrpcService.Services;
using WidgetManagementGrpcService.Utilities.Configuration;
using WidgetManagementIntegrationEvents.Widget;
using static SubscriptionManagementGrpcService.SubscriptionServices;

namespace WidgetManagementGrpcService.Utilities
{
    public class StartupHelper
    {
        public static void AddEventBus(IServiceCollection services, IConfiguration configuration)
        {
            // Add rabbit mq
            services.SetRabbitMqServiceAndConfiguration(configuration);

            // Add custom handlers etc
            services.AddTransient<UserDetailCreatedIntegrationEventHandler>();
            services.AddTransient<WidgetExecutedIntegrationEventHandler>();
        }


        public static void ConfigureEventBus(IApplicationBuilder app)
        {
            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();

            // Subscribe handlers to events
            eventBus.Subscribe<UserDetailCreatedIntegrationEvent, UserDetailCreatedIntegrationEventHandler>();
            eventBus.Subscribe<WidgetExecutedIntegrationEvent, WidgetExecutedIntegrationEventHandler>();
        }


        public static void AddGrpcServices(IServiceCollection services, IConfiguration configuration)
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            services.AddGrpcClient<SubscriptionServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5025");
            });            
        }


        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            // Add services
            services.AddTransient(typeof(IWidgetManagementIntegrationEventService), typeof(WidgetManagementIntegrationEventService));

            // Add repositories
            services.AddTransient(typeof(IDashboardRepository), typeof(DashboardRepository));
            services.AddTransient(typeof(IWidgetRepository), typeof(WidgetRepository));
            services.AddTransient(typeof(IWidgetUserExecutionTrackerRepository), typeof(WidgetUserExecutionTrackerRepository));
        }


        public static void AddConfiguration(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(sp => configuration.GetSection(nameof(WidgetManagementMongoDbConfiguration)).Get<WidgetManagementMongoDbConfiguration>());

            // Initialise static configuration
            // new StaticConfiguration(configuration);
        }
    }
}
