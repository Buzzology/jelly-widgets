using MicroservicesProjectLibrary.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserManagementLibrary.Repositories.UserDetail
{
    public class UserDetailRepositorySearchProperties : SearchProperties
    {
        public List<string> UserIds { get; set; }
    }
}