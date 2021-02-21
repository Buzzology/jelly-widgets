# WidgetManagmentGrpcService

## Entity framework
If getting an error add the -v (verbose) flag.
If using a new project and getting "doesn't reference EntityFrameworkCore" add a reference to the data project.

### Integration event log db context
dotnet ef migrations add new-migration --project WidgetManagementGrpcService --context IntegrationEventLogDbContext
dotnet ef database update --project WidgetManagementGrpcService --context IntegrationEventLogDbContext



## TODO  
#- Dashboard repository
#--- Get
#--- Create
#--- Update (rename, change order)
#--- Remove
#--- Search
#--- Add widget
#--- Remove widget
#- Dashboard create grpc service
#- Dashboard update grpc service (rename, change order)
#- Dashboard add dashboard widget grpc service
#- Dashboard remove dashboard widget grpc service
#- Dashboard update (re-order) dashboard widget grpc service
#- Dashboard get user dashboards (including nested dashboard widgets) so that they can be displayed
#- On user created event generate sample dashboard for the user

Widgets:
#- TFN Generator
#- TFN Validator
#- Australian Business Number Generator
- Australian Company Number Validator
- Australian medicare number generator
- Australian medicare number validator
- Medicare provider number generator
- Medicare provider number validator
- NZ TFN Generator
- NZ TFN Validator
- Australian driver's license generator
- Australian driver's license validator
- Social security number generator
- Social security number validator
- GUID Generator
- Notepad (save state)
- Random number generator (min, max, decimal places - save settings)
- Random colour generator
- Random person name generator
- Random address generator
- Random australian postcode
- Random email address generator
- Url encoder
- Url decoder
- Base64 encoder
- Base64 decoder
- json formatter
- json to single line
- Qr code generator

### Useful references
https://github.com/phuoc-ng/fake-numbers