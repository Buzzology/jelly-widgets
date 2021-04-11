# Container Registries

## Login
https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli
1. az login
2. az acr login --name myregistry

## Add an image to the registry
Do this from your local machine.
1. Pull an image to push
  - e.g. `docker pull mcr.microsoft.com/oss/nginx/nginx:1.15.5-alpine`
2. Create an alias of the image: `docker tag mcr.microsoft.com/oss/nginx/nginx:1.15.5-alpine myregistry.azurecr.io/samples/nginx`
3. Push the image: `docker push myregistry.azurecr.io/samples/nginx`
4. Pull the image from your repository: `docker pull myregistry.azurecr.io/samples/nginx`
5. Start the container: `docker run -it --rm -p 8080:80 myregistry.azurecr.io/samples/nginx`
6. Remove the image locally: `docker rmi myregistry.azurecr.io/samples/nginx`

You can also remove the container from the remote registry using the following command:
`az acr repository delete --name myregistry --image samples/nginx:latest`

## Create a service principal
1. Open the Azure Cli in the portal
2. Switch to bash
3. Upload CreateServicePrincipal.sh from the scripts folder
   - Update the ACR_NAME and SERVICE_PRINCIPAL_NAME values first
4. Run `bash ./CreateServicePrincipal.sh`
5. Save the displayed outputs to a keyvault

```
WARNING: The login server endpoint suffix '.azurecr.io' is automatically omitted.
WARNING: Found an existing application instance of "XXXXX". We will patch it
WARNING: Creating 'acrpull' role assignment under scope '/subscriptions/XXX/resourceGroups/widget-tools/providers/Microsoft.ContainerRegistry/registries/XXX'
WARNING: The output includes credentials that you must protect. Be sure that you do not include these credentials in your code or check the credentials into your source control. For more information, see https://aka.ms/azadsp-cli
Service principal ID: {SAVE_TO_KEY_VAULT}
Service principal password: {SAVE_TO_KEY_VAULT}
```

*If you forget the password it can be reset with `az ad sp credential reset  --name http://<service-principal-name> --query password --output tsv`.*

## Create a pull secret
Run the following command to create the pull secret:
```
kubectl create secret docker-registry jellywidgetspullsecret
    --namespace <namespace>
    --docker-server=<container-registry-name>.azurecr.io
    --docker-username=<service-principal-ID>
    --docker-password=<service-principal-password>
```

## Integrate aks with acr
`az aks update -n widgetsprod-aks -g myResourceGroup --attach-acr <acr-name>`