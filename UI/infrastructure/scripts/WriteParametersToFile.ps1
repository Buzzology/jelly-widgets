# Used to copy environment variables to a file so that they are more accessible to subsequent steps

$test = "$env:TEST_INPUT"
Write-Host("$env:TEST_INPUT")
Write-Host("$env:TEST_INPUT2")
Write-Host("HERE:")
Write-Host("$env:TEST_INPUT")
Write-Host("$test")

if($test -eq ""){
    Write-Host("INPUT_VARS not populated")    
    exit 1
}

"$env:TEST_INPUT" | Out-File "$env:OUTPUT_NAME"