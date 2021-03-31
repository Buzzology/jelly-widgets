# This script actually does the deployment. See the readme for more info.
Write-Host "List Files"
ls *

Write-Host "Getting content:"
get-content "parameters/parameters.prod.json"


az deployment group create --template-file ./main.bicep  --parameters "parameters/parameters.prod.json" -g "widgets-prod"