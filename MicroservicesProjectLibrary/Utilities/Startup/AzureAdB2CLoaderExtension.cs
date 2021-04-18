using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Serilog;
using System.IO;
using System.Linq;

namespace MicroservicesProjectLibrary.Utilities.Startup
{
    public static class AzureAdB2CLoaderExtension
    {
        public static void LoadAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            // https://docs.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/implement-api-gateways-with-ocelot
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(jwtOptions =>
                {
                    Log.Logger.Information("Configuration HEREERE:");
                    Log.Logger.Information(File.ReadAllText("appsettings.json"));

                    Log.Logger.Information("Configuration 2222222:");
                    foreach (var x in configuration.AsEnumerable())
                    {
                        Log.Logger.Information($"{x.Key}:{x.Value}");
                    }
                    Log.Logger.Information(File.ReadAllText("appsettings.json"));

                    System.Console.WriteLine(configuration.ToString());
                    var azureConfig = configuration.GetValue<AzureAdB2cConfiguration>("AzureAdB2cConfiguration");

                    System.Console.WriteLine("3333333333333333333");
                    Log.Logger.Information(azureConfig?.Authority);
                    Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true; // TODO: This should be removed in production and the authority url changed to https

                    jwtOptions.RequireHttpsMetadata = false; // TODO: This should be removed in production and the authority url changed to https
                    jwtOptions.Authority = azureConfig.Authority;
                    jwtOptions.Audience = azureConfig.AppClientId;
                    jwtOptions.Events = new JwtBearerEvents {
                        OnAuthenticationFailed = AuthenticationFailed,
                    };
                });
        }


        static Task AuthenticationFailed(AuthenticationFailedContext arg)
        {
            // For debugging purposes only!
            var s = $"AuthenticationFailed: {arg.Exception.Message}";
            arg.Response.ContentLength = s.Length;

            System.Diagnostics.Debugger.Break();
            return arg.Response.Body.WriteAsync(Encoding.UTF8.GetBytes(s), 0, s.Length);
        }


        public class AzureAdB2cConfiguration
        {
            public string Authority { get; set; }
            public string AppClientId { get; set; }
            public string Tenant { get; set; }
            public string SignUpSignInPolicyId { get; set; }
        }
    }
}
