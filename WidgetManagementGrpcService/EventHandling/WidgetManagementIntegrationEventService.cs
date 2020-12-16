using MicroservicesProjectLibrary.EventHandling.EventBus;
using MicroservicesProjectLibrary.EventHandling.Events;
using MicroservicesProjectLibrary.EventHandling.Services;
using MicroservicesProjectLibrary.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Data.Common;
using System.Reflection;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.EventHandling
{
    public class WidgetManagementIntegrationEventService : IWidgetManagementIntegrationEventService
    {
        private readonly Func<DbConnection, IIntegrationEventLogService> _integrationEventLogServiceFactory;
        private readonly IEventBus _eventBus;
        private readonly IntegrationEventLogDbContext _integrationEventLogDbContext;
        private readonly IIntegrationEventLogService _eventLogService;
        private readonly ILogger<WidgetManagementIntegrationEventService> _logger;

        public WidgetManagementIntegrationEventService(
            ILogger<WidgetManagementIntegrationEventService> logger,
            IEventBus eventBus,
            IntegrationEventLogDbContext integrationEventLogDbContext,
            Func<DbConnection, IIntegrationEventLogService> integrationEventLogServiceFactory)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _integrationEventLogServiceFactory = integrationEventLogServiceFactory ?? throw new ArgumentNullException(nameof(integrationEventLogServiceFactory));
            _eventBus = eventBus ?? throw new ArgumentNullException(nameof(eventBus));
            _eventLogService = _integrationEventLogServiceFactory(integrationEventLogDbContext.Database.GetDbConnection()); // (CJO) this was originally catalog context but that only seems to make sense if you want events saved there instead of in a separate db
            _integrationEventLogDbContext = integrationEventLogDbContext;
        }


        public async Task PublishThroughEventBusAsync(IntegrationEvent evt)
        {
            try
            {
                _logger.LogInformation("----- Publishing integration event: {IntegrationEventId_published} from {AppName} - ({@IntegrationEvent})", evt.Id, Program.AppName, evt);

                await _eventLogService.MarkEventAsInProgressAsync(evt.Id);

                _eventBus.Publish(evt);
                await _eventLogService.MarkEventAsPublishedAsync(evt.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR Publishing integration event: {IntegrationEventId} from {AppName} - ({@IntegrationEvent})", evt.Id, Program.AppName, evt);
                await _eventLogService.MarkEventAsFailedAsync(evt.Id);
            }
        }
    }
}
