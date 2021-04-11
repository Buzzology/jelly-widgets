# Used to copy environment variables to a file so that they are more accessible to subsequent steps
# NOTE: Key vault does not preserve line breaks (won't work for node env vars)

Write-Host("VALUES_TO_SAVE: $env:VALUES_TO_SAVE")
Write-Host("OUTPUT_NAME: $env:VALUES_TO_SAVE")

if("$env:VALUES_TO_SAVE" -eq ""){
    Write-Host("VALUES_TO_SAVE not populated")    
    exit 1
}

"$env:VALUES_TO_SAVE" | Out-File "$env:OUTPUT_NAME"