using MicroservicesProjectLibrary.Repositories;
using System.Collections.Generic;

namespace UserManagementGrpcService.Repositories.UserTour.Messages
{
    public class UserTourRepositorySearchProperties : SearchProperties
    {
        public List<string> UserIds { get; set; }

        public int UserTourId { get; set; }
    }
}