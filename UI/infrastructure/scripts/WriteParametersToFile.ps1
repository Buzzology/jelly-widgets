# Used to copy environment variables to a file so that they are more accessible to subsequent steps
$test = "$env:PIPELINE_VARS"
if($test -eq ""){
    Write-Host("PIPELINE_VARS not populated")    
    exit 1
}

Write-Host "Writing vars:"
Write-Host("$env:PIPELINE_VARS")

ls parameters/*

"$env:PIPELINE_VARS" | Out-File parameters/parameters.prod.json

ls parameters/*

gc ${parameters/parameters.prod.json}
