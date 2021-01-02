using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using static WidgetManagementGrpcService.DashboardServices;
using static WidgetManagementGrpcService.WidgetServices;

namespace WidgetManagementWebApi.Utilities
{
    public class StartupHelper
    {
        public static void AddGrpcServices(IServiceCollection services, IConfiguration configuration)
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            services.AddGrpcClient<DashboardServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5109");
            });

            services.AddGrpcClient<WidgetServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5109");
            });
        }
    }
}
