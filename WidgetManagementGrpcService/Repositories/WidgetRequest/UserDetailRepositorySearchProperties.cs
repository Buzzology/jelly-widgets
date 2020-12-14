using MicroservicesProjectLibrary.Repositories;
using System.Collections.Generic;

namespace WidgetManagementGrpcService.Repositories.UserDetail
{
    public class UserDetailRepositorySearchProperties : SearchProperties
    {
        public List<string> UserIds { get; set; }
    }
}