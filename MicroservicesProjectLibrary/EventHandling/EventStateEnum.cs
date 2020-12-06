using System;
using System.Collections.Generic;
using System.Text;

namespace MicroservicesProjectLibrary.EventHandling
{
    public enum EventStateEnum
    {
        NotPublished = 0,
        InProgress = 1,
        Published = 2,
        PublishedFailed = 3
    }
}
