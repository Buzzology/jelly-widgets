using MicroservicesProjectLibrary.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserManagementGrpcService.Repositories.UserDetail
{
    public class UserDetailRepositorySearchProperties : SearchProperties
    {
        public List<string> UserIds { get; set; }
    }
}