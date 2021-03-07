using System.Collections.Generic;
using System.Threading.Tasks;
using UserManagementGrpcService.Repositories.UserTour.Messages;

namespace UserManagementGrpcService.Repositories.UserTour
{
    public interface IUserTourRepository
    {
        Task<UserManagementData.Models.UserTour> Create(UserManagementData.Models.UserTour userTour);
        Task<List<UserManagementData.Models.UserTour>> Search(UserTourRepositorySearchProperties searchProperties, string currentUserId);
    }
}