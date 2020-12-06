using MicroservicesProjectLibrary.EventHandling.Events;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Threading.Tasks;

namespace MicroservicesProjectLibrary.EventHandling.Services
{
    public interface IIntegrationEventLogService
    {
        // Not sure if i actually want this? Task<IEnumerable<IntegrationEventLogEntry>> RetrieveEventLogsPendingToPublishAsync(Guid transactionId);
        Task<IntegrationEventLogEntry> SaveEventAsync(IntegrationEvent @event);
        Task MarkEventAsPublishedAsync(Guid eventId);
        Task MarkEventAsInProgressAsync(Guid eventId);
        Task MarkEventAsFailedAsync(Guid eventId);
        Task<IntegrationEventLogEntry> GetPendingEventToPublish(Guid eventId);
    }
}
