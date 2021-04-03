param resourceGroupName string
param namePrefix string
param linuxAdminUsername string
param sshRSAPublicKey string


// Create the cluster
module aks './aks.bicep' = {
  name: 'aks'
  scope: resourceGroup(resourceGroupName)
  params: {
    clusterName: '${namePrefix}-aks'
    dnsPrefix: '${namePrefix}-aks'
    agentCount: 1
    agentVMSize: 'Standard_B2s'
    linuxAdminUsername: linuxAdminUsername
    sshRSAPublicKey: sshRSAPublicKey
  }
}
