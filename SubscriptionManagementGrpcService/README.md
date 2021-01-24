# Subscription management grpc service

## Entity framework
If getting an error add the -v (verbose) flag.
If using a new project and getting "doesn't reference EntityFrameworkCore" add a reference to the data project.

### Integration event log db context
dotnet ef migrations add new-migration --project SubscriptionManagementGrpcService --context IntegrationEventLogDbContext
dotnet ef database update --project SubscriptionManagementGrpcService --context IntegrationEventLogDbContext

### Grpc context
dotnet ef migrations add new-migration --project SubscriptionManagementGrpcService --context SubscriptionManagementDbContext
dotnet ef database update --project SubscriptionManagementGrpcService --context SubscriptionManagementDbContext
