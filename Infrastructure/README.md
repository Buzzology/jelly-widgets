# Generic infrastructure
This is for shared infrastructure across each microservice.

Decompile an arm template into Bicep
`az bicep decompile --files key-vault.json`

# Deployment etc

## Run it
`az deployment group create --template-file ./main.bicep  --parameters ./parameters/parameters.prod.json -g "widgetsprod"`


## Pipeline
### Debugging
- Add a System.Debug variable to the pipeline with a value of `true` or check `enable diagnostics` on the run.
- Display all environment variables
```
  - task: Bash@3
    displayName: 'Display env vars'
    inputs:
      targetType: 'inline'
      script: 'env | sort'
```