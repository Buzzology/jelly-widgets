using MicroservicesProjectLibrary.EventHandling.Events;

namespace UserManagementIntegrationEvents.UserDetail
{
    public class UserDetailUpdatedIntegrationEvent : IntegrationEvent
    {
        public UserManagementData.Models.UserDetail User { get; set; }

        public UserDetailUpdatedIntegrationEvent(UserManagementData.Models.UserDetail user) => User = user;
    }
}
