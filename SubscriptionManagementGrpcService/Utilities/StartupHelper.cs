using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe;
using Stripe.Checkout;
using SubscriptionManagementGrpcService.EventHandling;
using SubscriptionManagementGrpcService.EventHandling.SiteCustomer;
using SubscriptionManagementGrpcService.Repositories.SiteCustomer;
using SubscriptionManagementGrpcService.Repositories.Subscription;
using UserManagementIntegrationEvents.UserDetail;

namespace SubscriptionManagementGrpcService.Utilities
{
    public class StartupHelper
    {        
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            // Stripe services
            services.AddTransient(typeof(CustomerService));
            services.AddTransient(typeof(SessionService), (serviceProvider) => new SessionService(new StripeClient("sk_test_51IARDTB2aL3Fzklyc2zgidxLLf6altYutf5JEQPJh8Hsg7Mj3k1GE1ca1VLinqHTVDFB626bmRuxxr01kZYCLPMg00ME9noJO7")));

            // Add repositories
            services.AddTransient(typeof(ISiteCustomerRepository), typeof(SiteCustomerRepository));
            services.AddTransient(typeof(ISubscriptionRepository), typeof(SubscriptionRepository));
        }


        public static void AddEventBus(IServiceCollection services, IConfiguration configuration)
        {
            // Add rabbit mq
            services.SetRabbitMqServiceAndConfiguration(configuration);

            // Add custom handlers etc
            services.AddTransient<ISubscriptionManagementIntegrationEventService, SubscriptionManagementIntegrationEventService>();
            services.AddTransient<UserDetailCreatedIntegrationEventHandler>();
        }

        public static void ConfigureEventBus(IApplicationBuilder app)
        {
            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();

            // Subscribe handlers to events
            eventBus.Subscribe<UserDetailCreatedIntegrationEvent, UserDetailCreatedIntegrationEventHandler>();
        }
    }
}
