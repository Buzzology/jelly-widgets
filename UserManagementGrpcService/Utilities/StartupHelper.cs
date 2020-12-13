using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.EventHandling.Services;
using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagementGrpcService.EventHandling;
using UserManagementGrpcService.Repositories.UserDetail;
using UserManagementGrpcService.Services;

namespace UserManagementGrpcService.Utilities
{
    public class StartupHelper
    {
        public static void AddEventBus(IServiceCollection services, IConfiguration configuration)
        {
            // Add rabbit mq
            services.SetRabbitMqServiceAndConfiguration(configuration);

            // Add custom handlers etc
            services.AddTransient<IUserManagementIntegrationEventService, UserManagementIntegrationEventService>();
        }

        public static void ConfigureEventBus(IApplicationBuilder app)
        {
            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();
        }


        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            // Add repositories
            services.AddTransient(typeof(IUserDetailRepository), typeof(UserDetailRepository));

            // Add grpc services
            services.AddTransient(typeof(UserDetailServices.UserDetailServicesBase), typeof(UserDetailServiceV1));
        }
    }
}
