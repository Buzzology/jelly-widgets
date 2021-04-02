# Used to copy environment variables to a file so that they are more accessible to subsequent steps
# if("$env:INPUT_VARS" -eq ""){
#     Write-Host("INPUT_VARS not populated")    
#     exit 1
# }

"$env:INPUT_VARS" | Out-File "$env:OUTPUT_NAME"