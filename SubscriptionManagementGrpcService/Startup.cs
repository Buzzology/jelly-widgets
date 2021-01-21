using AutoMapper;
using MicroservicesProjectLibrary.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SubscriptionManagementGrpcService.Infrastructure;
using SubscriptionManagementGrpcService.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Add databases
            services.AddDbContext<SubscriptionManagementDbContext>(
                options => {
                    options.UseNpgsql(
                        Configuration.GetValue("subscription-management-service-dbcontext-connection-string", ""),
                        b => b.MigrationsAssembly(nameof(SubscriptionManagementGrpcService))
                    );
                });
            services.AddDbContext<IntegrationEventLogDbContext>(
                options => {
                    options.UseNpgsql(
                        Configuration.GetValue("subscription-management-integration-event-log-dbcontext-connection-string", ""),
                        b => b.MigrationsAssembly(nameof(SubscriptionManagementGrpcService))
                    );
                });

            // Add misc
            services.AddGrpc(options =>
            {
                options.EnableDetailedErrors = true;
            });

            // Add automapper
            services.AddAutoMapper(typeof(Startup).Assembly); // https://tutexchange.com/how-to-set-up-automapper-in-asp-net-core-3-0/

            // Add custom services etc
            StartupHelper.AddServices(services, Configuration);
            StartupHelper.AddEventBus(services, Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGrpcService<GreeterService>();
            });
        }
    }
}
