using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagementIntegrationEvents.UserDetail;
using WidgetManagementGrpcService.EventHandling.Dashboard;
using WidgetManagementGrpcService.Repositories.Dashboard;
using WidgetManagementGrpcService.Repositories.Widget;
using WidgetManagementGrpcService.Services;
using WidgetManagementGrpcService.Utilities.Configuration;
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
        }


        public static void ConfigureEventBus(IApplicationBuilder app)
        {
            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();

            // Subscribe handlers to events
            eventBus.Subscribe<UserDetailCreatedIntegrationEvent, UserDetailCreatedIntegrationEventHandler>();
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
            // Add repositories
            services.AddTransient(typeof(IDashboardRepository), typeof(DashboardRepository));
            services.AddTransient(typeof(IWidgetRepository), typeof(WidgetRepository));
        }


        public static void AddConfiguration(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(sp => configuration.GetSection(nameof(WidgetManagementMongoDbConfiguration)).Get<WidgetManagementMongoDbConfiguration>());

            // Initialise static configuration
            // new StaticConfiguration(configuration);
        }
    }
}
