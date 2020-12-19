using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using static WidgetManagementGrpcService.DashboardServices;

namespace WidgetManagementWebApi.Utilities
{
    public class StartupHelper
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            // NOTE: We may need to put these back in the service.
            // Enable http2 on http: https://github.com/dotnet-architecture/eShopOnContainers/wiki/gRPC
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2Support", true);

            // Add grpc services
            services.AddTransient(typeof(DashboardServicesClient), (serviceProvider) => {

                //// Enable http2 on http: https://github.com/dotnet-architecture/eShopOnContainers/wiki/gRPC
                //AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                //AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2Support", true);

                return new DashboardServicesClient(GrpcChannel.ForAddress($"http://localhost:5202"));
            });
        }
    }
}
