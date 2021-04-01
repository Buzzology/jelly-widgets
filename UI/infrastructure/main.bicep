targetScope = 'subscription' // tenant', 'managementGroup', 'subscription', 'resourceGroup'

param resourceGroupName string
param namePrefix string

// Create the blob storage web site
module web_ui_storage_account './storage-accounts/storage-account.bicep' = {
  name: 'storage_account'
  scope: resourceGroup(resourceGroupName)
  params: {
    namePrefix: '${namePrefix}'
  }
}
