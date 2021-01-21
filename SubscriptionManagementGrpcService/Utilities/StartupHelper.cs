using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Utilities
{
    public class StartupHelper
    {
        public static void AddEventBus(IServiceCollection services, IConfiguration configuration)
        {
            // Add rabbit mq
            services.SetRabbitMqServiceAndConfiguration(configuration);

            // Add custom handlers etc
            //services.AddTransient<ISubscriptionManagementIntegrationEventService, UserManagementIntegrationEventService>();
        }

        public static void ConfigureEventBus(IApplicationBuilder app)
        {
            app.ApplicationServices.GetRequiredService<IEventBus>();
        }


        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            // Add repositories
            //services.AddTransient(typeof(IUserDetailRepository), typeof(UserDetailRepository));
        }
    }
}
