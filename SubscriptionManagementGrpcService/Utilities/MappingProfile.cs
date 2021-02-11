using MicroservicesProjectLibrary.Utilities.Converters;
using SubscriptionManagementData.Models;

namespace SubscriptionManagementGrpcService.Utilities
{
    public class MappingProfile : BaseMappingProfile
    {
        public MappingProfile()
        {
            CreateMap<Subscription, SubscriptionDto>()
                .ForMember(x => x.Expires, y => y.MapFrom(src => src.CurrentPeriodEnd))
                .ReverseMap();
        }
    }
}