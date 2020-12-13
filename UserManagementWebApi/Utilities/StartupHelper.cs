using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static UserManagementGrpcService.UserDetailServices;

namespace UserManagementWebApi.Utilities
{
    public class StartupHelper
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            // NOTE: We may need to put these back in the service. Test
            // Enable http2 on http: https://github.com/dotnet-architecture/eShopOnContainers/wiki/gRPC
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2Support", true);

            // Add grpc services
            services.AddTransient(typeof(UserDetailServicesClient), (serviceProvider) => {

                //// Enable http2 on http: https://github.com/dotnet-architecture/eShopOnContainers/wiki/gRPC
                //AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                //AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2Support", true);

                return new UserDetailServicesClient(GrpcChannel.ForAddress($"http://localhost:5202"));
            });
        }
    }
}