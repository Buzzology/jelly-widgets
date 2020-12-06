using Microsoft.Extensions.Configuration;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.KeyVault;

namespace MicroservicesProjectLibrary.Utilities.Startup
{
    public static class AzureKeyVaultConfigurationLoaderExtension
    {
        public static void SetAzureKeyVaultConfiguration(this IConfigurationBuilder builder)
        {
            // Retrieve config from azure key vault if it's enabled
            var config = builder.Build();
            if (config.GetValue("azure-key-vault:enabled", false))
            {
                var azureServiceTokenProvider = new AzureServiceTokenProvider();
                var keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));

                builder.AddAzureKeyVault(
                    $"{config["azure-key-vault:name"]}", // https://{name}.vault.azure.net
                    config["azure-key-vault:client-id"],
                    config["azure-key-vault:client-secret"]);// https://docs.microsoft.com/en-us/azure/key-vault/vs-key-vault-add-connected-service
            }
        }
    }
}
