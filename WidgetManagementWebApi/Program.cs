using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;


namespace WidgetManagementWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    config.SetDefaultConfiguration();
                    config.SetAzureKeyVaultConfiguration();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
