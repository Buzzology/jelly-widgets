param namePrefix string = 'unique'
param location string = resourceGroup().location

// Create the nginx ip
module nginx_ip './ip-address.bicep' = {
  name: 'nginx_ip'
  params: {
    namePrefix: namePrefix
    location: location
  }
}
