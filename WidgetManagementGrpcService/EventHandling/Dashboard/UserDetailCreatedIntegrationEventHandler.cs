using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagementIntegrationEvents.UserDetail;
using WidgetManagementConstants;
using WidgetManagementGrpcService.Repositories.Dashboard;

namespace WidgetManagementGrpcService.EventHandling.Dashboard
{
    public class UserDetailCreatedIntegrationEventHandler : IIntegrationEventHandler<UserDetailCreatedIntegrationEvent>
    {
        private readonly ILogger<UserDetailCreatedIntegrationEventHandler> _logger;
        private readonly IDashboardRepository _dashboardRepository;

        public UserDetailCreatedIntegrationEventHandler(
                ILogger<UserDetailCreatedIntegrationEventHandler> logger,
                IDashboardRepository dashboardRepository
            )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _dashboardRepository = dashboardRepository;
        }


        public async Task Handle(UserDetailCreatedIntegrationEvent @event)
        {
            _logger.LogInformation($"IntegrationEventContext: {@event.Id}-{Program.AppName}"); // TODO: serilog
            _logger.LogInformation("----- Handling integration event: {IntegrationEventId} at {AppName} - ({@IntegrationEvent})", @event.Id, Program.AppName, @event);

            try
            {
                // Check if the user already has a dashboard
                var searchResponse = await _dashboardRepository.Search(
                    new DashboardRepositorySearchProperties
                    {
                        CurrentUserId = @event.User?.UserDetailId
                    });

                if (!searchResponse.Any())
                {
                    // User doesn't have any dashboards yet - create one with a sample widget
                    await _dashboardRepository.Create(
                        new WidgetManagementData.Models.Dashboard
                        {
                            DashboardId = Guid.NewGuid().GetUrlFriendlyString(),
                            DashboardWidgets = new List<WidgetManagementData.Models.DashboardWidget>
                            {
                                new WidgetManagementData.Models.DashboardWidget
                                {
                                    DashboardWidgetId = Guid.NewGuid().GetUrlFriendlyString(),
                                    WidgetId = WidgetIds.TfnGeneratorWidgetId,
                                    OrderNumber = 1,
                                }
                            },
                            Name = "Welcome",
                            OrderNumber = 1,
                            UserId = @event.User?.UserDetailId,
                        },
                        @event.User?.UserDetailId
                    );
                }
            }
            catch (Exception e)
            {
                _logger.LogInformation($"----- Failed to create default dashboard for {@event.User?.UserDetailId}: {@event.Id} at {Program.AppName} - ({@event}) {e.Message}");
                throw;
            }
        }
    }
}
