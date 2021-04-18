using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Serilog;
using System.IO;

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
                    System.Console.WriteLine("Configuration HEREERE:");
                    System.Console.WriteLine("Configuration HEREERE:");
                    Log.Logger.Information(configuration.ToString());
                    Log.Logger.Information(File.ReadAllText("appsettings.json");

                    System.Console.WriteLine(configuration.ToString());
                    var resultJson = configuration.GetSection("AzureAdB2cConfiguration").Value;
                    var azureConfig = JsonConvert.DeserializeObject<AzureAdB2cConfiguration>(resultJson);

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
