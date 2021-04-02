# Used to copy environment variables to a file so that they are more accessible to subsequent steps

$test = "$env:VALUES_TO_SAVE"
Write-Host("HERE:")

if($test -eq ""){
    Write-Host("VALUES_TO_SAVE not populated")    
    exit 1
}

"$env:VALUES_TO_SAVE" | Out-File "$env:OUTPUT_NAME"