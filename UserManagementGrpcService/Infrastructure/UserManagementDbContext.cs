using Microsoft.EntityFrameworkCore;
using UserManagementData.Models;

namespace UserManagementGrpcService.Infrastructure
{
    public class UserManagementDbContext : DbContext
    {
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<UserTour> UserTours { get; set; }

        // Default constructor error: https://stackoverflow.com/a/48659898/522859
        public UserManagementDbContext(DbContextOptions<UserManagementDbContext> options) : base(options) { }
    }
}