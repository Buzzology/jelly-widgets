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
using UserManagementGrpcService.Infrastructure;

namespace UserManagementGrpcService.EventHandling
{
    public class UserManagementIntegrationEventService : IUserManagementIntegrationEventService
    {
        private readonly Func<DbConnection, IIntegrationEventLogService> _integrationEventLogServiceFactory;
        private readonly IEventBus _eventBus;
        private readonly IntegrationEventLogDbContext _integrationEventLogDbContext;
        private readonly UserManagementDbContext _userManagementDbContext;
        private readonly IIntegrationEventLogService _eventLogService;
        private readonly ILogger<UserManagementIntegrationEventService> _logger;

        public UserManagementIntegrationEventService(
            ILogger<UserManagementIntegrationEventService> logger,
            IEventBus eventBus,
            IntegrationEventLogDbContext integrationEventLogDbContext,
            UserManagementDbContext userManagementDbContext,
            Func<DbConnection, IIntegrationEventLogService> integrationEventLogServiceFactory)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _integrationEventLogServiceFactory = integrationEventLogServiceFactory ?? throw new ArgumentNullException(nameof(integrationEventLogServiceFactory));
            _eventBus = eventBus ?? throw new ArgumentNullException(nameof(eventBus));
            _eventLogService = _integrationEventLogServiceFactory(integrationEventLogDbContext.Database.GetDbConnection()); // (CJO) this was originally catalog context but that only seems to make sense if you want events saved there instead of in a separate db
            _integrationEventLogDbContext = integrationEventLogDbContext;
            _userManagementDbContext = userManagementDbContext;
        }


        public async Task PublishThroughEventBusAsync(IntegrationEvent evt)
        {
            try
            {
                _logger.LogInformation("----- Publishing integration event: {evt.Id} from {Assembly.GetCallingAssembly()?.GetName()} - ({@evt})");

                await _eventLogService.MarkEventAsInProgressAsync(evt.Id);

                _eventBus.Publish(evt);
                await _eventLogService.MarkEventAsPublishedAsync(evt.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"ERROR Publishing integration event: {evt.Id} from {Assembly.GetCallingAssembly()?.GetName()} - ({@evt})");
                await _eventLogService.MarkEventAsFailedAsync(evt.Id);
            }
        }


        public async Task SaveEventAndContentManagementContextChangesAsync(IntegrationEvent evt)
        {
            _logger.LogInformation($"----- {nameof(UserManagementIntegrationEventService)} - Saving changes and integrationEvent: {evt.Id}");

            //Use of an EF Core resiliency strategy when using multiple DbContexts within an explicit BeginTransaction():
            //See: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency            
            await ResilientTransaction.New(_userManagementDbContext).ExecuteAsync(async () =>
            {
                // Achieving atomicity between original catalog database operation and the IntegrationEventLog thanks to a local transaction
                await _userManagementDbContext.SaveChangesAsync();
                await _eventLogService.SaveEventAsync(evt);
            });
        }
    }
}