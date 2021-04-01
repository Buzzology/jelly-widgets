targetScope = 'subscription' // tenant', 'managementGroup', 'subscription', 'resourceGroup'

param vmPgsqlUsername string
param vmPgsqlPassword string
param resourceGroupName string
param toolsResourceGroupName string
param namePrefix string
param tenantId string
param aksLinuxAdminUsername string
param aksSshRSAPublicKey string
param keyVaultAdminObjectId string
param keyVaultPipelineObjectId string

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

// Create the cluster
module aks './kubernetes-clusters/aks.bicep' = {
  name: 'aks'
  scope: resourceGroup(resourceGroupName)
  params: {
    clusterName: '${namePrefix}-aks'
    dnsPrefix: '${namePrefix}-aks'
    agentCount: 1
    agentVMSize: 'Standard_B2s'
    linuxAdminUsername: aksLinuxAdminUsername
    sshRSAPublicKey: aksSshRSAPublicKey
  }
}

output vmName string = vm_pgsql.name
