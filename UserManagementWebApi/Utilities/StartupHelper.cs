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

namespace UserManagementWebApi.Utilities
{
    public class StartupHelper
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            //This will force the gRPC.Client to use HTTP/2 even though it's unencrypted
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            //// Enable http2 on http: https://github.com/dotnet-architecture/eShopOnContainers/wiki/gRPC
            //AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
            //AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2Support", true);

            //// Add grpc services
            //services.AddTransient(typeof(UserDetailServicesClient), (serviceProvider) => {

            //    AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
            //    AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2Support", true);

            //    return new UserDetailServicesClient(GrpcChannel.ForAddress($"http://localhost:5002", new GrpcChannelOptions
            //    {
            //        Vers
            //    }));
            //});
        }


        public static void AddGrpcServices(IServiceCollection services, IConfiguration configuration)
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            //services.AddTransient(typeof(UserDetailServicesClient), (serviceProvider) =>
            //{

            //    AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
            //    AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2Support", true);

            //    var httpClient = new HttpClient();
            //    httpClient.DefaultRequestVersion = HttpVersion.Version20;
            //    httpClient.DefaultVersionPolicy = HttpVersionPolicy.RequestVersionOrHigher;

            //    var httpHandler = new HttpClientHandler();
            //    httpHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;

            //    var channel = GrpcChannel.ForAddress("http://localhost:5005", new GrpcChannelOptions {
            //        //HttpClient = httpClient,
            //        HttpHandler = httpHandler
            //    });
            //    var client = new UserDetailServicesClient(channel);

            //    return client;
            //});

            services.AddGrpcClient<UserDetailServicesClient>(c =>
            {
                c.Address = new Uri(@"http://localhost:5005");
            });
        }
    }
}