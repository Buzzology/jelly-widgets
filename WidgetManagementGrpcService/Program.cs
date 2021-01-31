using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;
using WidgetManagementGrpcService.Repositories.Widget;
using WidgetManagementGrpcService.Utilities.Seed;

namespace WidgetManagementGrpcService
{
    public class Program
    {
        public static readonly string Namespace = typeof(Program).Namespace;
        public static readonly string AppName = Namespace.Substring(Namespace.LastIndexOf('.') >= 0 ? Namespace.LastIndexOf('.') - 1 : 0);

        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var widgetsRepository = scope.ServiceProvider.GetRequiredService<IWidgetRepository>();

                // Seed data
                await SeedWidgets.Run(widgetsRepository);
            }
            
            host.Run();
        }

        // Additional configuration is required to successfully run gRPC on macOS.
        // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                 .ConfigureAppConfiguration((context, config) =>
                 {
                     config.SetDefaultConfiguration();
                     config.SetAzureKeyVaultConfiguration();
                 })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                    .ConfigureKestrel(options =>
                    {
                        //options.ConfigureEndpointDefaults(lo => lo.Protocols = HttpProtocols.Http2);
                        options.ListenLocalhost(5109, listenOptions =>
                        {
                            listenOptions.Protocols = HttpProtocols.Http2;
                        });
                    });
                });
    }
}
