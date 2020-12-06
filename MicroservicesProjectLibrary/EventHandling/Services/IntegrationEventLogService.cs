using MicroservicesProjectLibrary.EventHandling.Events;
using MicroservicesProjectLibrary.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace MicroservicesProjectLibrary.EventHandling.Services
{
    public class IntegrationEventLogService : IIntegrationEventLogService
    {
        private readonly DbConnection _dbConnection;
        private readonly List<Type> _eventTypes;
        private readonly IntegrationEventLogDbContext _integrationEventLogDbContext;

        public IntegrationEventLogService(DbConnection dbConnection)
        {
            _dbConnection = dbConnection;

            // Create the connection to the integration events postgres db
            _integrationEventLogDbContext = new IntegrationEventLogDbContext(
                new DbContextOptionsBuilder<IntegrationEventLogDbContext>()
                    .UseNpgsql(_dbConnection)
                    .Options);

            // Retrieve all integration event types
            _eventTypes = Assembly.Load(Assembly.GetEntryAssembly().FullName)
               .GetTypes()
               .Where(t => t.Name.EndsWith(nameof(IntegrationEvent)))
               .ToList();
        }


        public async Task<IntegrationEventLogEntry> GetPendingEventToPublish(Guid eventId)
        {
            var logEntry = _integrationEventLogDbContext.IntegrationEventLogEntries.FirstOrDefault(x => x.EventId == eventId);

            if(logEntry.State != EventStateEnum.NotPublished)
            {
                return null;
            }

            return logEntry;
        }


        public async Task<IntegrationEventLogEntry> SaveEventAsync(IntegrationEvent @event)
        {
            var eventLogEntry = new IntegrationEventLogEntry(@event);
            _integrationEventLogDbContext.IntegrationEventLogEntries.Add(eventLogEntry);

            await _integrationEventLogDbContext.SaveChangesAsync();

            return eventLogEntry;
        }


        public Task MarkEventAsPublishedAsync(Guid eventId)
        {
            return UpdateEventStatus(eventId, EventStateEnum.Published);
        }


        public Task MarkEventAsInProgressAsync(Guid eventId)
        {
            return UpdateEventStatus(eventId, EventStateEnum.InProgress);
        }


        public Task MarkEventAsFailedAsync(Guid eventId)
        {
            return UpdateEventStatus(eventId, EventStateEnum.PublishedFailed);
        }


        private Task UpdateEventStatus(Guid eventId, EventStateEnum status)
        {
            var eventLogEntry = _integrationEventLogDbContext.IntegrationEventLogEntries.Single(ie => ie.EventId == eventId);
            eventLogEntry.State = status;

            if (status == EventStateEnum.InProgress)
                eventLogEntry.TimesSent++;

            //_dbContext.IntegrationEventLogs.Update(eventLogEntry); I don't think this is needed

            return _integrationEventLogDbContext.SaveChangesAsync();
        }
    }
}
