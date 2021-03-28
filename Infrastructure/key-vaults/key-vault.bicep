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
  }
}

resource key_vault_key_vault_client_id 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = {
  name: '${key_vault.name}/azure-key-vault-client-id'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource key_vault_key_vault_client_secret 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = {
  name: '${key_vault.name}/azure-key-vault-client-secret'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource key_vault_azure_key_vault_name 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = {
  name: '${key_vault.name}/azure-key-vault-name'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource key_vault_connection_string_mongodb 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = {
  name: '${key_vault.name}/connection-string-mongodb'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource key_vault_connection_string_postgresql 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = {
  name: '${key_vault.name}/connection-string-postgresql'
  properties: {
    attributes: {
      enabled: true
    }
  }
}
