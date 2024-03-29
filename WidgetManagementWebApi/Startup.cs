using AutoMapper;
using MicroservicesProjectLibrary.Utilities.Startup;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using WidgetManagementWebApi.Utilities;

namespace WidgetManagementWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Load authentication via shared library
            services.LoadAuthentication(Configuration);
            
            // Add cors
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed((host) => true)
                    .AllowCredentials());
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = nameof(WidgetManagementWebApi), Version = "v1" });
            });

            // Add additional libraries/packages
            object p = services.AddAutoMapper(typeof(Startup).Assembly); // https://tutexchange.com/how-to-set-up-automapper-in-asp-net-core-3-0/            

            // Add custom services etc
            StartupHelper.AddGrpcServices(services, Configuration);
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WidgetManagementWebApi v1"));
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
