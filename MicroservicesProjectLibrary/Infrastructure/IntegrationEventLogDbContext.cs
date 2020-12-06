using MicroservicesProjectLibrary.EventHandling;
using Microsoft.EntityFrameworkCore;

namespace MicroservicesProjectLibrary.Infrastructure
{
    public class IntegrationEventLogDbContext : DbContext
    {
        public IntegrationEventLogDbContext(DbContextOptions<IntegrationEventLogDbContext> options) : base(options) { }

        public DbSet<IntegrationEventLogEntry> IntegrationEventLogEntries { get; set; }
    }
}
