using System.Collections.Generic;
using System.Threading.Tasks;
using WidgetManagementGrpcService.Repositories.Widget;

namespace WidgetManagementGrpcService.Utilities.Seed
{
    public static class SeedWidgets
    {
        public static async Task Run(IWidgetRepository widgetsRepository)
        {
            var widgetsToGenerate = new List<WidgetManagementData.Models.Widget>
            {
                new WidgetManagementData.Models.Widget { Name = "TFN Generator", Description = "This widget can be used to generate random Australian tax file numbers (TFN). Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.TfnGeneratorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "TFN Validator", Description = "This widget can be used to validate Australian tax file numbers (TFN). Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.TfnValidatorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "ABN Generator", Description = "This widget can be used to generate Australian business numbers (ABN). Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.AustralianBusinessNumberGeneratorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "ABN Validator", Description = "This widget can be used to validate Australian business numbers (ACN). Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.AustralianBusinessNumberValidatorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "ACN Generator", Description = "This widget can be used to generate Australian company numbers (ACN). Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.AustralianCompanyNumberGeneratorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "ACN Validator", Description = "This widget can be used to validate Australian company numbers (ACN). Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.AustralianCompanyNumberValidatorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "AUS Medicare Nbr Generator", Description = "This widget can be used to generate Australian medicare numbers. Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.AustralianMedicareNumberGeneratorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "AUS Medicare Nbr Validator", Description = "This widget can be used to validate Australian medicare numbers. Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.AustralianMedicareNumberValidatorWidgetId },
                new WidgetManagementData.Models.Widget { Name = "New Zealand IRD validator.", Description = "This widget can be used to validate New Zealand IRDs. Suitable for testing and validation purposes.",WidgetId = WidgetManagementConstants.WidgetIds.NewZealandIRDValidator },
                new WidgetManagementData.Models.Widget { Name = "New Zealand IRD generator.", Description = "This widget can be used to generate random New Zealand IRDs. Suitable for testing and validation purposes.", WidgetId = WidgetManagementConstants.WidgetIds.NewZealandIRDGenerator },
            };

            foreach(var widgetToGenerate in widgetsToGenerate)
            {
                if (await widgetsRepository.Get(widgetToGenerate.WidgetId, string.Empty) == null)
                {
                    await widgetsRepository.Create(widgetToGenerate, string.Empty);
                }
                else
                {
                    await widgetsRepository.Update(widgetToGenerate, string.Empty);
                }
            }
        }
    }
}
