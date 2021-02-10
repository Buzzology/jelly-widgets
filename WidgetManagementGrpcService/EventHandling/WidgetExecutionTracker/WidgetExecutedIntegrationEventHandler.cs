using MicroservicesProjectLibrary.EventHandling.EventBus;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WidgetManagementGrpcService.Repositories.WidgetUserExecutionTracker;
using WidgetManagementIntegrationEvents.Widget;

namespace WidgetManagementGrpcService.EventHandling.WidgetExecutionTracker
{
    public class WidgetExecutedIntegrationEventHandler : IIntegrationEventHandler<WidgetExecutedIntegrationEvent>
    {
        private readonly ILogger<WidgetExecutedIntegrationEventHandler> _logger;
        private readonly IWidgetUserExecutionTrackerRepository _widgetUserExecutionTrackerRepository;

        public WidgetExecutedIntegrationEventHandler(
            ILogger<WidgetExecutedIntegrationEventHandler> logger,
            IWidgetUserExecutionTrackerRepository widgetUserExecutionTrackerRepository
        )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _widgetUserExecutionTrackerRepository = widgetUserExecutionTrackerRepository;
        }


        public async Task Handle(WidgetExecutedIntegrationEvent @event)
        {
            _logger.LogInformation($"IntegrationEventContext: {@event.Id}-{Program.AppName}"); // TODO: serilog
            _logger.LogInformation($"----- Handling integration event: {@event.Id} at {Program.AppName} - ({@event})");

            try
            {
                // Retrieve current archive or create
                var tracker = await _widgetUserExecutionTrackerRepository
                    .GetCurrentOrCreate(@event.UserId) ?? throw new ArgumentException($"{nameof(WidgetExecutedIntegrationEvent)} not processed for {@event}.");

                // Check if there's already an entry for this widget
                if (tracker.WidgetIdExecutions.ContainsKey(@event.WidgetId))
                {
                    tracker.WidgetIdExecutions[@event.WidgetId]++;
                }
                else
                {
                    tracker.WidgetIdExecutions.Add(@event.WidgetId, 1);
                }

                // Increment total executions
                tracker.TotalExecutions++;

                // Check whether we need to reset the daily executions
                if(tracker?.DailyExecutionsReset == null || tracker?.DailyExecutionsReset <= DateTime.UtcNow)
                {
                    tracker.DailyExecutionsReset = DateTime.UtcNow.AddDays(1);
                    tracker.DailyExecutions = 1;
                }
                else
                {
                    tracker.DailyExecutions++;
                }

                // Update the tracker
                await _widgetUserExecutionTrackerRepository.Update(tracker, @event.UserId);
            }
            catch (Exception e)
            {
                _logger.LogInformation($"----- Failed to track widget for {@event.UserId}: {@event.Id} at {Program.AppName} - ({@event}) {e.Message}");
                throw;
            }
        }
    }
}