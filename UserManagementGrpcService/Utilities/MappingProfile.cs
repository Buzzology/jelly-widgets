using MicroservicesProjectLibrary.Utilities.Converters;
using UserManagementData.Models;
using UserTourGrpcService;

namespace UserManagementGrpcService.Utilities
{
    public class MappingProfile : BaseMappingProfile
    {
        public MappingProfile()
        {
            CreateMap<UserDetail, UserDetailDto>().ReverseMap();
            CreateMap<UserTour, UserTourDto>().ReverseMap();
        }
    }
}