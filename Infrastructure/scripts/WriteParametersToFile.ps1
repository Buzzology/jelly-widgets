# Used to copy environment variables to a file so that they are more accessible to subsequent steps
#ls
#"$env:PipelineInfrastructure" | Out-File parameters/parameters.prod.json

Write-Host "List Files"
ls *

$test = "$env:PIPELINE_VARS"
if($test -eq ""){
    Write-Host("PIPELINE_VARS not populated")
    exit 1
}

Write-Host "Getting content #1:"
Write-Host("$test")
Write-Host("$env:PIPELINE_VARS")

"$env:PIPELINE_VARS" | Out-File parameters/parameters.prod.json

# Write-Host "Getting content #2:"
# ${$env:PIPELINE_VARS}

# get-content "parameters/parameters.prod.json"
# ${parameters/parameters.prod.json}

# Write-Host "More Info"
# Write-Host $(PipelineInfrastructure)
# Write-Host "$(SECRET_PIPELINEINFRASTRUCTURE)"

# Write-Host "$SECRET_PIPELINEINFRASTRUCTURE"
# Write-Host "$SECRET_PIPELINEINFRASTRUCTURE"
