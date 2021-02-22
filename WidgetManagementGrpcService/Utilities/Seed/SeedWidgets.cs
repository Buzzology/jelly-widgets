using System.Threading.Tasks;
using WidgetManagementGrpcService.Repositories.Widget;

namespace WidgetManagementGrpcService.Utilities.Seed
{
    public static class SeedWidgets
    {
        private const string TfnGeneratorWidgetId = WidgetManagementConstants.WidgetIds.TfnGeneratorWidgetId;
        private const string TfnValidatorWidgetId = WidgetManagementConstants.WidgetIds.TfnValidatorWidgetId;
        private const string AustralianBusinessNumberGeneratorWidgetId = WidgetManagementConstants.WidgetIds.AustralianBusinessNumberGeneratorWidgetId;
        private const string AustralianBusinessNumberValidatorWidgetId = WidgetManagementConstants.WidgetIds.AustralianBusinessNumberValidatorWidgetId;
        private const string AustralianCompanyNumberValidatorWidgetId = WidgetManagementConstants.WidgetIds.AustralianCompanyNumberValidatorWidgetId;
        private const string AustralianCompanyNumberGeneratorWidgetId = WidgetManagementConstants.WidgetIds.AustralianCompanyNumberGeneratorWidgetId;

        public static async Task Run(IWidgetRepository widgetsRepository)
        {
            if(await widgetsRepository.Get(TfnGeneratorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Generate a random TFN", Name = "TFN Generator", WidgetId = TfnGeneratorWidgetId }, string.Empty);
            }

            if (await widgetsRepository.Get(TfnValidatorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Validate a TFN", Name = "TFN Validator", WidgetId = TfnValidatorWidgetId }, string.Empty);
            }

            if (await widgetsRepository.Get(AustralianBusinessNumberGeneratorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Australian business number generator.", Name = "ABN Generator", WidgetId = AustralianBusinessNumberGeneratorWidgetId }, string.Empty);
            }

            if (await widgetsRepository.Get(AustralianBusinessNumberValidatorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Australian business number validator.", Name = "ABN Validator", WidgetId = AustralianBusinessNumberValidatorWidgetId }, string.Empty);
            }

            if (await widgetsRepository.Get(AustralianCompanyNumberGeneratorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Australian company number generator.", Name = "ACN Generator", WidgetId = AustralianCompanyNumberGeneratorWidgetId }, string.Empty);
            }

            if (await widgetsRepository.Get(AustralianCompanyNumberValidatorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Australian company number validator.", Name = "ACN Validator", WidgetId = AustralianCompanyNumberValidatorWidgetId }, string.Empty);
            }
        }
    }
}
