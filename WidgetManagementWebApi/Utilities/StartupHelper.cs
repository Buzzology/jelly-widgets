using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using static WidgetManagementGrpcService.DashboardServices;

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
        }
    }
}
