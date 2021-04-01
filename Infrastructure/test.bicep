param vaults_widgetsprodbh5qtqj2ezp6m_name string = 'widgetsprodbh5qtqj2ezp6m'

resource vaults_widgetsprodbh5qtqj2ezp6m_name_resource 'Microsoft.KeyVault/vaults@2020-04-01-preview' = {
  name: vaults_widgetsprodbh5qtqj2ezp6m_name
  location: 'eastus2'
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: 'a8e1a028-43ee-4ed8-95b4-ccc1f55259c6'
    accessPolicies: [
      {
        tenantId: 'a8e1a028-43ee-4ed8-95b4-ccc1f55259c6'
        objectId: '51917c77-3722-4156-8855-759547c7ca0d'
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
        tenantId: 'a8e1a028-43ee-4ed8-95b4-ccc1f55259c6'
        objectId: 'a60729bf-64cd-4d4f-b2a2-859c4ca12382'
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
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: false
    enableSoftDelete: true
    vaultUri: 'https://${vaults_widgetsprodbh5qtqj2ezp6m_name}.vault.azure.net/'
    provisioningState: 'Succeeded'
  }
}

resource vaults_widgetsprodbh5qtqj2ezp6m_name_my_test_secret 'Microsoft.KeyVault/vaults/secrets@2020-04-01-preview' = {
  name: '${vaults_widgetsprodbh5qtqj2ezp6m_name_resource.name}/my-test-secret'
  location: 'eastus2'
  properties: {
    contentType: 'string'
    attributes: {
      enabled: true
    }
  }
}

resource vaults_widgetsprodbh5qtqj2ezp6m_name_pipeline_infrastructure 'Microsoft.KeyVault/vaults/secrets@2020-04-01-preview' = {
  name: '${vaults_widgetsprodbh5qtqj2ezp6m_name_resource.name}/pipeline-infrastructure'
  location: 'eastus2'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_widgetsprodbh5qtqj2ezp6m_name_PipelineInfrastructure 'Microsoft.KeyVault/vaults/secrets@2020-04-01-preview' = {
  name: '${vaults_widgetsprodbh5qtqj2ezp6m_name_resource.name}/PipelineInfrastructure'
  location: 'eastus2'
  properties: {
    attributes: {
      enabled: true
    }
  }
}