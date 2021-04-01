# Used to copy environment variables to a file so that they are more accessible to subsequent steps
$test = "$env:PIPELINE_VARS"
if($test -eq ""){
    Write-Host("PIPELINE_VARS not populated")
    Write-Host("${test}")
    exit 1
}

Write-Host "Writing vars:"

"$env:PIPELINE_VARS" | Out-File parameters/parameters.prod.json
