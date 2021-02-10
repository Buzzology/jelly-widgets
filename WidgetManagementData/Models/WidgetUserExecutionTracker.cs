using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace WidgetManagementData.Models
{
    /// <summary>
    /// Used to keep track of how many times a user has used each widget. They
    /// are archived each subscription renewal (probably monthly).
    /// </summary>
    public class WidgetUserExecutionTracker
    {
        [BsonId]
        public string WidgetUserExecutionTrackerId { get; set; }

        [BsonRequired]
        public string UserDetailId { get; set; }

        [BsonRequired]
        public DateTime Created { get; set; }

        public bool Archived { get; set; }

        public long TotalExecutions { get; set; }

        public long DailyExecutions { get; set; }

        public DateTime DailyExecutionsReset { get; set; }

        public Dictionary<string, long> WidgetIdExecutions { get; set; }
    }
}
