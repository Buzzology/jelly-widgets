using Microsoft.Extensions.Configuration;
using Serilog;

namespace MicroservicesProjectLibrary.Utilities.Startup
{
    public static class SerilogSetupExtension
    {
        public static ILogger CreateSerilogLogger(IConfiguration configuration, string appName)
        {
            var seqServerUrl = configuration["Serilog:SeqServerUrl"];

            return new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .Enrich.WithProperty("ApplicationContext", appName)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.Seq(string.IsNullOrWhiteSpace(seqServerUrl) ? "http://seq" : seqServerUrl)
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
        }
    }
}
