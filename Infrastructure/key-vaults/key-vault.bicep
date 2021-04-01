param namePrefix string
param location string = resourceGroup().location
param tenantId string
param accessPolicies array
param secrets array

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
    accessPolicies: accessPolicies
  }
}

resource key_vault_secrets 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = [for secret in secrets: {
  name: '${key_vault.name}/${secret.name}'
  properties: {
    value: secret.value
    contentType: 'string'
    attributes: {
      enabled: true
    }
  }
}]
