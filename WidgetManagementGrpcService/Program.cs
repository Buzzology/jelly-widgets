using Microsoft.AspNetCore.Hosting;
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

            // Seed data
            await SeedWidgets.Run(host);
            
            host.Run();
        }

        // Additional configuration is required to successfully run gRPC on macOS.
        // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
