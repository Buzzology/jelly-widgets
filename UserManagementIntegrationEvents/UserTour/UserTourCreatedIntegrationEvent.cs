using MicroservicesProjectLibrary.EventHandling.Events;

namespace UserManagementIntegrationEvents.UserTour
{
    public class UserTourCreatedIntegrationEvent : IntegrationEvent
    {
        public UserManagementData.Models.UserTour UserTour { get; set; }

        public UserTourCreatedIntegrationEvent(UserManagementData.Models.UserTour userTour) => UserTour = userTour;
    }
}