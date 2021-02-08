using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using static StripeEventLogManagementGrpcService.StripeEventLogServices;
using static SubscriptionManagementGrpcService.SiteCustomerServices;
using static SubscriptionManagementGrpcService.SubscriptionServices;

namespace UserManagementWebApi.Utilities
{
    public class StartupHelper
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
         
        }


        public static void AddGrpcServices(IServiceCollection services, IConfiguration configuration)
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            services.AddGrpcClient<SiteCustomerServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5025");
            });

            services.AddGrpcClient<SubscriptionServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5025");
            });

            services.AddGrpcClient<StripeEventLogServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5025");
            });
        }
    }
}