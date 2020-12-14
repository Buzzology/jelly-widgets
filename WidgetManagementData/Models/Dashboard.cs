using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace WidgetManagementData.Models
{
    [BsonIgnoreExtraElements]
    public class Dashboard
    {
        [BsonId]
        public string DashboardId { get; set; }

        public List<DashboardWidget> DashboardWidgets { get; set; }

        public string Name { get; set; }

        public int OrderNumber { get; set; }

        public string UserId { get; set; }
    }
}
