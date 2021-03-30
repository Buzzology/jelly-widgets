param namePrefix string
param location string = resourceGroup().location
param tenantId string

var name = '${namePrefix}${uniqueString(resourceGroup().id)}'

resource key_vault 'Microsoft.KeyVault/vaults@2019-09-01' = {
  name: name
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }    
    tenantId: tenantId
    accessPolicies: [
      // TODO: Need to add these
      // {
      //   tenantId: tenantId
      //   objectId: string
        // applicationId: string
        // permissions": {
        //   "keys": [
        //     "string"
        //   ],
        //   "secrets": [
        //     "string"
        //   ],
        //   "certificates": [
        //     "string"
        //   ],
        //   "storage": [
        //     "string"
        //   ]
        // }
      // }
    ]
  }
}

resource my_test_secret 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = {
  name: '${key_vault.name}/my-test-secret'
  properties: {
    value: 'my_test_value'
    contentType: 'string'
    attributes: {
      enabled: true
    }
  }
}
