# Used to copy environment variables to a file so that they are more accessible to subsequent steps

$test = "$env:INPUT_VARS"
Write-Host("$env:TEST_INPUT")
Write-Host("HERE:")
Write-Host("$env:INPUT_VARS")
Write-Host("$test")

if($test -eq ""){
    Write-Host("INPUT_VARS not populated")    
    exit 1
}

"$env:INPUT_VARS" | Out-File "$env:OUTPUT_NAME"