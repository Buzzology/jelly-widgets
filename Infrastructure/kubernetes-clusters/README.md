# AKS

Following this guide on microsoft docs:
https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough-rm-template

## Connect to the cluster
1. Install kubectl: `az aks install-cli`
2. Configure it to connect to the cluster: `az aks get-credentials --resource-group widgets-prod --name widgetsprod-aks`

## Kubectl commands

## Nodes
- Get Nodes: `kubectl get nodes`

## Pods
- Get pods: `kubectl get pods`

## Services
- Get Services: `kubectl get services`