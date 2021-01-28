using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MicroservicesProjectLibrary.Utilities.Startup;
using UserManagementWebApi.Utilities;
using Microsoft.OpenApi.Models;
using Stripe;

namespace SubscriptionManagementWebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; init; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Load authentication via shared library
            services.LoadAuthentication(Configuration);
            
            // Add cors
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed((host) => true)
                    .AllowCredentials());
            });

            // Add additional libraries/packages
            object p = services.AddAutoMapper(typeof(Startup).Assembly); // https://tutexchange.com/how-to-set-up-automapper-in-asp-net-core-3-0/            

            // Add custom services etc
            StartupHelper.AddServices(services, Configuration);
            StartupHelper.AddGrpcServices(services, Configuration);

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = nameof(SubscriptionManagementWebApi), Version = "v1" });
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{nameof(UserManagementWebApi)} v1"));
            }

            app.UseHttpsRedirection();
            app.UseMiddleware(typeof(ApiErrorHandlingMiddleware));
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("CorsPolicy");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
