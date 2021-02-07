using Microsoft.EntityFrameworkCore;

namespace SubscriptionManagementGrpcService.Infrastructure
{
    public class SubscriptionManagementDbContext : DbContext
    {
        public DbSet<SubscriptionManagementData.Models.SiteCustomer> SiteCustomers { get; set; }
        public DbSet<SubscriptionManagementData.Models.StripeEventLog> StripeEventLogs { get; set; }
        public DbSet<SubscriptionManagementData.Models.Subscription> Subscriptions { get; set; }

        // Default constructor error: https://stackoverflow.com/a/48659898/522859
        public SubscriptionManagementDbContext(DbContextOptions<SubscriptionManagementDbContext> options) : base(options) { }
    }
}