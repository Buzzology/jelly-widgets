using Microsoft.EntityFrameworkCore;
using SubscriptionManagementData.Models.Stripe;

namespace SubscriptionManagementGrpcService.Infrastructure
{
    public class SubscriptionManagementDbContext : DbContext
    {
        public DbSet<SiteCustomer> UserDetails { get; set; }

        // Default constructor error: https://stackoverflow.com/a/48659898/522859
        public SubscriptionManagementDbContext(DbContextOptions<SubscriptionManagementDbContext> options) : base(options) { }
    }
}