targetScope = 'subscription' // tenant', 'managementGroup', 'subscription', 'resourceGroup'

param vmPgsqlUsername string
param vmPgsqlPassword string
param resourceGroupName string
param toolsResourceGroupName string
param namePrefix string
param tenantId string

// Setup the standard vnet
module vnet_generic './vnets/vnet-generic.bicep' = {
  name: 'vnet'
  scope: resourceGroup(resourceGroupName)
  params: {
    namePrefix: '${namePrefix}-vnet'
  }
}

// Create the container registry
module acr './container-registries/container-registry.bicep' = {
  name: 'acr'
  scope: resourceGroup(toolsResourceGroupName)
  params: {
    namePrefix: 'widgets'
  }
}

// Create the container registry
module key_vault_prod './container-registries/container-registry.bicep' = {
  name: 'key-vault'
  scope: resourceGroup(toolsResourceGroupName)
  params: {
    namePrefix: '${namePrefix}KeyVault'
  }
}

// Create the database (currently houses mongo as well)
module vm_pgsql './virtual-machines/postgresql/vm-postgresql.bicep' = {
  name: 'vm-pgsql'
  scope: resourceGroup(resourceGroupName)
  params: {
    namePrefix: '${namePrefix}-vm'
    subnetId: vnet_generic.outputs.subnetId
    username: vmPgsqlUsername
    password: vmPgsqlPassword
  }
}
 

output vmName string = vm_pgsql.name
