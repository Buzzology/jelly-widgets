using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using static UserManagementGrpcService.UserDetailServices;
using static UserTourGrpcService.UserTourServices;

namespace UserManagementWebApi.Utilities
{
    public class StartupHelper
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
        }


        public static void AddGrpcServices(IServiceCollection services, IConfiguration configuration)
        {
            // This will force the gRPC.Client to use HTTP/2 even though it's unencrypted
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            services.AddGrpcClient<UserDetailServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5005");
            });

            services.AddGrpcClient<UserTourServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5005");
            });
        }
    }
}