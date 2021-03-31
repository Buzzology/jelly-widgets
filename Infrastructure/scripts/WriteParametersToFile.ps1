# Used to copy environment variables to a file so that they are more accessible to subsequent steps
ls
"$env:PipelineInfrastructure" | Out-File parameters/parameters.prod.json
