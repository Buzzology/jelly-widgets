/* NOTE: We do not create this as part of the main build because there is currently no clean way to avoid wiping the secrets */


// Create the key vault
module key_vault_prod './key-vaults/key-vault.bicep' = {
  name: 'key-vault'
  scope: resourceGroup(toolsResourceGroupName)
  params: {
    namePrefix: namePrefix
    tenantId: tenantId
    secrets: [
      {
        name: 'my-test-secret'
        value: 'my-test-value'
      }
      {
        name: 'PipelineInfrastructure'
        value: ''
      }  
      {
        name: 'PipelineUI'
        value: ''
      }  
    ]
    accessPolicies: [
      {
        tenantId: tenantId
        objectId: keyVaultPipelineObjectId
        permissions: {
          keys: []
          secrets: [
            'get'
            'list'
          ]
          certificates: []
        }
      }
      {
        tenantId: tenantId
        objectId: keyVaultAdminObjectId
        permissions: {
          keys: [
            'get'
            'list'
            'update'
            'create'
            'import'
            'delete'
            'recover'
            'backup'
            'restore'
            'decrypt'
            'encrypt'
            'unwrapKey'
            'wrapKey'
            'verify'
            'sign'
            'purge'
          ]
          secrets: [
            'get'
            'list'
            'set'
            'recover'
            'backup'
            'restore'
            'delete'
          ]
          certificates: [
            'get'
            'list'
            'update'
            'create'
            'import'
            'delete'
            'recover'
            'backup'
            'restore'
            'managecontacts'
            'manageissuers'
            'getissuers'
            'listissuers'
            'setissuers'
            'deleteissuers'
            'purge'
          ]
        }
      }
    ]
  }
}
