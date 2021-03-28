# Generic infrastructure
This is for shared infrastructure across each microservice.

Decompile an arm template into Bicep

## Run it
az deployment group create --template-file ./main.bicep  --parameters ./parameters/parameters.prod.json -g "{YOUR_RESOURCE_GROUP}"