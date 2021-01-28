using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using SubscriptionManagementGrpcService.Infrastructure;
using SubscriptionManagementGrpcService.Repositories.SiteCustomer;
using System;
using System.Linq;
using System.Threading.Tasks;
using UserManagementIntegrationEvents.UserDetail;

namespace SubscriptionManagementGrpcService.EventHandling.SiteCustomer
{
    public class UserDetailCreatedIntegrationEventHandler : IIntegrationEventHandler<UserDetailCreatedIntegrationEvent>
    {
        private readonly ILogger<UserDetailCreatedIntegrationEventHandler> _logger;
        private readonly ISiteCustomerRepository _siteCustomerRepository;

        public UserDetailCreatedIntegrationEventHandler(
                ILogger<UserDetailCreatedIntegrationEventHandler> logger,
                ISiteCustomerRepository siteCustomerRepository
            )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _siteCustomerRepository = siteCustomerRepository;
        }


        public async Task Handle(UserDetailCreatedIntegrationEvent @event)
        {
            _logger.LogInformation($"IntegrationEventContext: {@event.Id}-{Program.AppName}"); // TODO: serilog
            _logger.LogInformation("----- Handling integration event: {IntegrationEventId} at {AppName} - ({@IntegrationEvent})", @event.Id, Program.AppName, @event);

            try
            {
                // Check if the site customer already exists
                var searchResponse = await _siteCustomerRepository.Search(
                    new SiteCustomerRepositorySearchProperties
                    {
                        UserId = @event.User?.UserDetailId,
                    });

                if (!searchResponse.Any())
                {
                    await _siteCustomerRepository.Create(
                        new SubscriptionManagementData.Models.SiteCustomer
                        {
                            SiteCustomerId = Guid.NewGuid().GetUrlFriendlyString(),
                            DisplayName = @event.User.DisplayName,
                            UserDetailId = @event.User?.UserDetailId,
                            EmailAddress = @event.User?.EmailAddress,
                            ExternalCustomerId = null,
                        },
                        @event.User?.UserDetailId
                    );
                }
            }
            catch (Exception e)
            {
                _logger.LogInformation($"----- Failed to create {nameof(SubscriptionManagementData.Models.SiteCustomer)} for {@event.User?.UserDetailId}: {@event.Id} at {Program.AppName} - ({@event}) {e.Message}");
                throw;
            }
        }
    }
}