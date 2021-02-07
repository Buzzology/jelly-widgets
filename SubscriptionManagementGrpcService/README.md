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


# Stripe 

## Stripe CLI
Docs are here: https://stripe.com/docs/stripe-cli  
Download from the following: https://github.com/stripe/stripe-cli/releases/tag/v1.5.8  
Placed in c:\program files\Stripe
Added to path environment variable

Authenticating (expires every 90 days):
```
stripe login --api-key sk_test_51IARDTB2aL3Fzklyc2zgidxLLf6altYutf5JEQPJh8Hsg7Mj3k1GE1ca1VLinqHTVDFB626bmRuxxr01kZYCLPMg00ME9noJO7
<Press Enter to Login>
```

Listen
```
stripe listen --forward-to localhost:44387/webhooks/stripe
```