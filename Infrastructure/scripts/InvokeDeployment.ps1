# This script actually does the deployment. See the readme for more info.

# Used to copy environment variables to a file so that they are more accessible to subsequent steps
ls
"$env:PipelineInfrastructure" | Out-File parameters/parameters.prod.json

Write-Host "List Files"
ls *

Write-Host "Getting content:"
get-content "parameters/parameters.prod.json"
${parameters/parameters.prod.json}
${$PipelineInfrastructure}


az deployment group create --template-file ./main.bicep  --parameters "parameters/parameters.prod.json" -g "widgets-prod"