using Microsoft.EntityFrameworkCore;
using WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Infrastructure
{
    public class WidgetsManagementDbContext : DbContext
    {
        public DbSet<Widget> Widgets { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; }

        // Default constructor error: https://stackoverflow.com/a/48659898/522859
        public WidgetsManagementDbContext(DbContextOptions<WidgetsManagementDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Widget>().HasData(
                new Widget {
                    WidgetId = WidgetManagementConstants.WidgetIds.TfnGeneratorWidgetId,
                    Name = "Australian Tax File Number Generator",
                    Description = "Generate a random TFN.",
                });

            modelBuilder.Entity<Widget>().HasData(
                new Widget
                {
                    WidgetId = WidgetManagementConstants.WidgetIds.TfnValidatorWidgetId,
                    Name = "Australian Tax File Number Validator",
                    Description = "Validate a TFN."
                });
        }
    }
}