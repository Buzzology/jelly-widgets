using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementGrpcService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        // Additional configuration is required to successfully run gRPC on macOS.
        // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    SetConfiguration(config);
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .ConfigureKestrel(options => options.ListenLocalhost(5202)) // Set grpc port
                        .UseStartup<Startup>();
                });

        private static void SetConfiguration(IConfigurationBuilder builder)
        {
            // Loaded via library extensions
            builder.SetDefaultConfiguration();
            builder.SetAzureKeyVaultConfiguration();
        }
    }
}
