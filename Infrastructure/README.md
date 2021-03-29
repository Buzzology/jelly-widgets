# Generic infrastructure
This is for shared infrastructure across each microservice.

Decompile an arm template into Bicep
`az bicep decompile --files key-vault.json`

## Run it
az deployment group create --template-file ./main.bicep  --parameters ./parameters/parameters.prod.json -g "{YOUR_RESOURCE_GROUP}"