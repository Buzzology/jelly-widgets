namespace WidgetManagementGrpcService.Utilities.Configuration
{
    public class WidgetManagementMongoDbConfiguration
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string DashboardsCollectionName { get; set; }
        public string WidgetsCollectionName { get; set; }
        public string WidgetUserExecutionTrackersCollectionName { get; set; }
    }
}