targetScope = 'subscription' // tenant', 'managementGroup', 'subscription', 'resourceGroup'

param vmPgsqlUsername string
param vmPgsqlPassword string
param resourceGroupName string
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
  scope: resourceGroup(resourceGroupName)
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

// Create the ingress ip address
module nginx_ip './ip-addresses/ip-address.bicep' = {
  name: 'nginx_ip'
  scope: resourceGroup(resourceGroupName)
  params: {
    namePrefix: 'widgets'
  }
}

// TODO: (CJO) This is failing with this error:  "message": "{\r\n  \"error\": {\r\n    \"code\": \"DeploymentActive\",\r\n    \"message\": \"Unable to edit or replace deployment 'aks': previous deployment from '4/7/2021 4:50:46 AM' is still active (expiration time is '4/14/2021 4:50:46 AM'). Please see https://aka.ms/arm-deploy for usage details.\"\r\n  }\r\n}"
// Create the cluster
module aks './kubernetes-clusters/aks-prod.bicep' = {
  name: 'aks_prod'
  scope: resourceGroup(resourceGroupName)
  params: {
    resourceGroupName: resourceGroupName
    namePrefix: namePrefix
    linuxAdminUsername: aksLinuxAdminUsername
    sshRSAPublicKey: aksSshRSAPublicKey
  }
}




output vmName string = vm_pgsql.name
