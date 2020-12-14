using System.Collections.Generic;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.UserDetail
{
    public interface IUserDetailRepository
    {
        Task<UserManagementData.Models.UserDetail> Create(UserManagementData.Models.UserDetail userInput, string userId);
        Task<UserManagementData.Models.UserDetail> Get(string userId, string currentUserId);
        Task<List<UserManagementData.Models.UserDetail>> Search(UserDetailRepositorySearchProperties searchProperties);
        Task<UserManagementData.Models.UserDetail> Update(UserManagementData.Models.UserDetail userInput, string userId);
    }
}