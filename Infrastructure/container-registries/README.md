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