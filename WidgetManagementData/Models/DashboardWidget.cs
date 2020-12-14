using MongoDB.Bson.Serialization.Attributes;

namespace WidgetManagementData.Models
{
    [BsonIgnoreExtraElements]
    public class DashboardWidget
    {
        [BsonId]
        public string WidgetId { get; set; }

        public int OrderNumber { get; set; }
    }
}
