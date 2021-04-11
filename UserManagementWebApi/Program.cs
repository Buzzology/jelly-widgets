using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;

namespace UserManagementWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            Log.Logger.Information($"Starting {nameof(UserManagementWebApi)}: {DateTime.UtcNow}");
            CreateHostBuilder(args).Build().Run();
            Log.Logger.Information($"Started {nameof(UserManagementWebApi)}: {DateTime.UtcNow}");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    config.SetDefaultConfiguration();
                    config.SetAzureKeyVaultConfiguration();
                    config.AddJsonFile("appsettings.json", true);
                })
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

    }
}
