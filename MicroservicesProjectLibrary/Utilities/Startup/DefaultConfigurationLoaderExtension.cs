using System.IO;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.KeyVault;
using MicroservicesProjectLibrary.Utilities.Startup;

namespace MicroservicesProjectLibrary.Utilities.Startup
{
    public static class DefaultConfigurationLoaderExtension
    {
        public static void SetDefaultConfiguration(this IConfigurationBuilder builder)
        {
            // Add appsetting files and override with local settings if available
            builder
                .SetBasePath(Directory.GetCurrentDirectory())
                //.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                //.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
                //.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
        }
    }
}
