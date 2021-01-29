using System.Threading.Tasks;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.WidgetUserExecutionTracker
{
    public interface IWidgetUserExecutionTrackerRepository
    {
        public Task<Models.WidgetUserExecutionTracker> Get(string id, string currentUserId);
        public Task<Models.WidgetUserExecutionTracker> Create(Models.WidgetUserExecutionTracker widgetExecutionTracker, string currentUserId);
        public Task<Models.WidgetUserExecutionTracker> Update(Models.WidgetUserExecutionTracker widgetExecutionTrackerIn, string currentUserId);
        public Task<Models.WidgetUserExecutionTracker> Archive(string widgetUserExecutionTrackerId, string currentUserId);
        public Task<Models.WidgetUserExecutionTracker> GetCurrentOrCreate(string userDetailId);
    }
}

// TODO: Implement this logic so that we can expose this via a controller
// TODO: Implement scaffold for this entity in ui
// TODO: Implement a controller
// TODO: Load this on page load
// TODO: any subsequent triggers in ui should decrement ui count