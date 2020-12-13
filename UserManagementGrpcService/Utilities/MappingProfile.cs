using MicroservicesProjectLibrary.Utilities.Converters;
using UserManagementData.Models;

namespace UserManagementGrpcService.Utilities
{
    public class MappingProfile : BaseMappingProfile
    {
        public MappingProfile()
        {
            CreateMap<UserDetail, UserDetailDto>();
            CreateMap<UserDetailDto, UserDetail>();
        }
    }
}