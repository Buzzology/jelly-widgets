# Used to copy environment variables to a file so that they are more accessible to subsequent steps
ls
"$env:PipelineInfrastructure" | Out-File parameters/parameters.prod.json

Write-Host "List Files"
ls *

Write-Host "Getting content:"
get-content "parameters/parameters.prod.json"
${parameters/parameters.prod.json}

Write-Host "More Info"
Write-Host "$(PipelineInfrastructure)"
# Write-Host "$(SECRET_PIPELINEINFRASTRUCTURE)"

# Write-Host "$SECRET_PIPELINEINFRASTRUCTURE"
# Write-Host "$SECRET_PIPELINEINFRASTRUCTURE"
