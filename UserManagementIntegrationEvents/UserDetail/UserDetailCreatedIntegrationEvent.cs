using MicroservicesProjectLibrary.EventHandling.Events;

namespace UserManagementIntegrationEvents.UserDetail
{
    public class UserDetailCreatedIntegrationEvent : IntegrationEvent
    {
        public UserManagementData.Models.UserDetail User { get; set; }

        public UserDetailCreatedIntegrationEvent(UserManagementData.Models.UserDetail user) => User = user;
    }
}