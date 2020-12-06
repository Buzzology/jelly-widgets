using System;
using System.Collections.Generic;
using System.Text;

namespace MicroservicesProjectLibrary.EventHandling.Events
{
    public class IntegrationEvent
    {
        public Guid Id { get; private set; }

        public DateTime CreationDate { get; private set; }

        public IntegrationEvent()
        {
            Id = Guid.NewGuid();
            CreationDate = DateTime.UtcNow;
        }
    }
}
