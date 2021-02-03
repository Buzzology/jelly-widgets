using MicroservicesProjectLibrary.Utilities.Converters;
using WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Utilities
{
    public class MappingProfile : BaseMappingProfile
    {
        public MappingProfile()
        {
            CreateMap<Dashboard, DashboardDto>();
            CreateMap<DashboardDto, Dashboard>();
            CreateMap<DashboardWidget, DashboardWidgetDto>();
            CreateMap<DashboardWidgetDto, DashboardWidget>();
            CreateMap<Widget, WidgetDto>();
            CreateMap<WidgetDto, Widget>();
            CreateMap<WidgetUserExecutionTracker, WidgetUserExecutionTrackerDto>();
            CreateMap<WidgetUserExecutionTrackerDto, WidgetUserExecutionTracker>();
        }
    }
}