using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;

namespace SubscriptionManagementWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine($"Starting {nameof(SubscriptionManagementWebApi)}: {DateTime.UtcNow}");
            CreateHostBuilder(args).Build().Run();
            Console.WriteLine($"Started {nameof(SubscriptionManagementWebApi)}: {DateTime.UtcNow}");
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
