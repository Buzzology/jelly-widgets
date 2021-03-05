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
#- Australian Business Number Validator
#- Australian Company Number Validator
#- Australian Company Number Generator
#- Australian medicare number generator
#- Australian medicare number validator
#- NZ TFN Generator (acutally IRD)
- NZ TFN Validator
- Social security number generator
- Social security number validator

- Medicare provider number generator
- Medicare provider number validator
- Australian driver's license generator
- Australian driver's license validator
- Social security number generator
- Social security number validator
- GUID Generator
- Guid validator
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
- Generator a full test user
- Cron job creator
- Cron job describer

### Useful references
https://github.com/phuoc-ng/fake-numbers
https://clearwater.com.au/code
http://www.ird.govt.nz/resources/b/9/b9369180451ef8e19355bb7747109566/rwt-nrwt-spec-2011-v1.pdf
Test user identity generator: https://www.fakenamegenerator.com/gen-random-au-au.php
