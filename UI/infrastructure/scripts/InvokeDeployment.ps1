# This script actually does the deployment. See the readme for more info.

ls

az deployment group create --template-file ./main.bicep  --parameters "parameters/parameters.prod.json" -g "widgets-prod"