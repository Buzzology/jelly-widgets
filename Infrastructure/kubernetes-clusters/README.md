# AKS
Following this guide on microsoft docs:
https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough-rm-template

There is also a good overview of all of the pieces here: https://docs.microsoft.com/en-us/azure/aks/concepts-clusters-workloads

## Cheat Sheet
https://kubernetes.io/docs/reference/kubectl/cheatsheet/ 

## Connect to the cluster
1. Install kubectl: `az aks install-cli`
2. Configure it to connect to the cluster: `az aks get-credentials --resource-group widgets-prod --name widgetsprod-aks`

## Kubectl commands

## Deployments
- Dump logs for a deployment: `kubectl logs deploy/my-deployment`

## Nodes
- Get Nodes: `kubectl get nodes`
- Check available resources: `kubectl describe <NODE_NAME>`

## Pods
- Get pods: `kubectl get pods`

## Services
Services are an abstraction that groups a logical set of pods. They allow network access to a set of pods.
- Get Services: `kubectl get services`

## Stateful sets
- Used for deploying databases as part of the cluster.  
https://docs.microsoft.com/en-us/azure/aks/concepts-clusters-workloads#statefulsets
https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

## Namespaces
- Get namespaces: `kubectl get namespaces`
- Create a namespace: 
  ```
  # my-namespace.yml
  apiVersion: v1
  kind: Namespace
  metadata:
  name: <insert-namespace-name-here>
   ```

   `kubectl create -f ./my-namespace.yaml`