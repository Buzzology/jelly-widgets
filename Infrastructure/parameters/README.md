# Creating a VM on Azure with Bicep

## Run it
az deployment group create --template-file ./main.bicep  --parameters ./parameters/parameters.prod.json -g "{YOUR_RESOURCE_GROUP}"

## SSH


### Generate keys on windows
https://docs.microsoft.com/en-us/azure/virtual-machines/linux/ssh-from-windows#create-an-ssh-key-pair  
```
ssh-keygen -m PEM -t rsa -b 4096
```

Outputs to here by default: `C:\Users\Chris/.ssh/id_rsa`

### Reset password on the VM in azure portal  
1. Reset SSH public key  
2. Add a username and provide the rsa.pub value for the ssh public key  
3. Press Update

### Add a public ip to vm
1. Go to your VM on portal.
2. Click on the Networking under settings in VM blade.
3. Click on the Network Interface in Networking blade.
4. Click on IP Configuration under settings in Network Interface blade.
5. Click on the IP configuration on the IP configuration table.
6. Select Enable under Public IP address settings.
7. Create a New IP address and choose static. Save the IP address and then the IP

*Note: If you get an error about regions etc you may need to create the IP in that region manually first.*

### Associate a nsg with ssh access


### Connect to the vm via SSH
ssh -i ~/.ssh/widgetsprod/id_rsa.pub widgetsprod@104.209.151.169


