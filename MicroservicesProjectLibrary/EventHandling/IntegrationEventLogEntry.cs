using MicroservicesProjectLibrary.EventHandling.Events;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace MicroservicesProjectLibrary.EventHandling
{
    /***
     * These allow us to record all events for a system, implement replay in the future etc.
     ***/
    public class IntegrationEventLogEntry
    {
        private IntegrationEventLogEntry() {  }
        public IntegrationEventLogEntry(IntegrationEvent evt)
        {
            EventId = evt.Id;
            CreationTime = evt.CreationDate;
            EventTypeName = evt.GetType().FullName;
            Content = JsonConvert.SerializeObject(evt);
            State = EventStateEnum.NotPublished;
            TimesSent = 0;
        }

        [Key]
        public Guid EventId { get; private set; }

        public string EventTypeName { get; private set; }

        [NotMapped]
        public string EventTypeShortName => EventTypeName.Split('.')?.Last();

        [NotMapped]
        public IntegrationEvent IntegrationEvent { get; private set; }

        public EventStateEnum State { get; set; }

        public int TimesSent { get; set; }

        public DateTime CreationTime { get; private set; }

        public string Content { get; private set; }

        public string TransactionId { get; private set; }

        public IntegrationEventLogEntry DeserializeJsonContent(Type type)
        {
            IntegrationEvent = JsonConvert.DeserializeObject(Content, type) as IntegrationEvent;
            return this;
        }
    }
}
