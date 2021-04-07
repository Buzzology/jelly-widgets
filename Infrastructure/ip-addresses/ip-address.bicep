param namePrefix string = 'unique'
param location string = resourceGroup().location

var name = '${namePrefix}-${uniqueString(resourceGroup().id)}'

resource public_ip_address 'Microsoft.Network/publicIPAddresses@2020-08-01' = {
  name: name
  location: location
  // tags: {
  //   service: 'ingress-basic/nginx-ingress-ingress-nginx-controller'
  // }
  sku: {
    name: 'Basic'
    tier: 'Regional'
  }
  properties: {
    //ipAddress: '52.247.63.205'
    publicIPAddressVersion: 'IPv4'
    publicIPAllocationMethod: 'Static'
    idleTimeoutInMinutes: 4
    ipTags: []
  }
}
