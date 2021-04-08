# Nginx Ingress
https://docs.microsoft.com/en-us/azure/aks/ingress-static-ip#before-you-begin

## Creating the ingress with a static ip
1. Run the script in scripts/CreateNginxIngress.sh

### Useful commands
View the ingress: `kubectl --namespace ingress-basic get services -o wide -w nginx-ingress-ingress-nginx-controller`

## Setup cert manager
https://docs.microsoft.com/en-us/azure/aks/ingress-static-ip#install-cert-manager

```
# Label the cert-manager namespace to disable resource validation
kubectl label namespace ingress-basic cert-manager.io/disable-validation=true

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the cert-manager Helm chart
helm install cert-manager --namespace ingress-basic --version v0.16.1 --set installCRDs=true --set nodeSelector."beta\.kubernetes\.io/os"=linux jetstack/cert-manager
```

## Setup the cluster issuer
Run the following commands:
1. `kubectl apply -f manifests\ingress\cluster-issuer.yml --namespace ingress-basic`
2. `kubectl apply -f manifests\ingress\ingress-production.yml --namespace ingress-basic`

## Create a certificate object
Verify that secret has been created: `kubectl describe certificate tls-secret --namespace ingress-basic`




