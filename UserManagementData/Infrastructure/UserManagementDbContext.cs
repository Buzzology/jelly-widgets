using Microsoft.EntityFrameworkCore;
using UserManagementData.Models;

namespace UserManagementData.Infrastructure
{
    public class UserManagementDbContext : DbContext
    {
        public DbSet<UserDetail> UserDetails;

        // Default constructor error: https://stackoverflow.com/a/48659898/522859
        public UserManagementDbContext(DbContextOptions<UserManagementDbContext> options) : base(options) { }
    }
}