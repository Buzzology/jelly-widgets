# Create ingress with static ip address
You must update replace STATIC_IP and DNS_LABEL with your own IP address and unique name when running the command.

## Create a namespace for your ingress resources
kubectl create namespace ingress-basic

## Add the ingress-nginx repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

## Use Helm to deploy an NGINX ingress controller
helm install nginx-ingress ingress-nginx/ingress-nginx
    --namespace ingress-basic
    --set controller.replicaCount=2
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux
    --set controller.admissionWebhooks.patch.nodeSelector."beta\.kubernetes\.io/os"=linux
    --set controller.service.loadBalancerIP="52.177.218.216"
    --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-dns-label-name"="jellywidgets"