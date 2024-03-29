﻿using MongoDB.Bson.Serialization.Attributes;

namespace WidgetManagementData.Models
{
    [BsonIgnoreExtraElements]
    public class Widget
    {
        [BsonId]
        public string WidgetId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}