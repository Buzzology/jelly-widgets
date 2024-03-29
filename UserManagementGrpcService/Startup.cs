﻿using AutoMapper;
using MicroservicesProjectLibrary.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using UserManagementGrpcService.Infrastructure;
using UserManagementGrpcService.Services;
using UserManagementGrpcService.Utilities;

namespace UserManagementGrpcService
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
            services.AddDbContext<UserManagementDbContext>(
                options => {
                    options.UseNpgsql(
                        Configuration.GetValue("user-management-service-dbcontext-connection-string", ""),
                        b => b.MigrationsAssembly(nameof(UserManagementGrpcService))
                    );
                });
            services.AddDbContext<IntegrationEventLogDbContext>(
                options => {
                    options.UseNpgsql(
                        Configuration.GetValue("user-management-integration-event-log-dbcontext-connection-string", ""),
                        b => b.MigrationsAssembly("UserManagementGrpcService")
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

            //app.UseHttpsRedirection();

            StartupHelper.ConfigureEventBus(app);

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGrpcService<UserDetailServiceV1>();
                endpoints.MapGrpcService<UserTourServiceV1>();
            });
        }
    }
}
