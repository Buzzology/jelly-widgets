# User management grpc service

## Entity framework

### Integration event log db context
dotnet ef database update --project UserManagementGrpcService --context IntegrationEventLogDbContext  
dotnet ef migrations add new-migration --project UserManagementGrpcService --context IntegrationEventLogDbContext  

### User management db context
dotnet ef database update --project UserManagementGrpcService --context UserManagementDbContext  
dotnet ef migrations add new-migration --project UserManagementGrpcService --context UserManagementDbContext  