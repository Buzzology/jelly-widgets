using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetManagementGrpcService.Repositories.Widget;

namespace WidgetManagementGrpcService.Utilities.Seed
{
    public static class SeedWidgets
    {
        private const string TfnGeneratorWidgetId = WidgetManagementConstants.WidgetIds.TfnGeneratorWidgetId;
        private const string TfnValidatorWidgetId = WidgetManagementConstants.WidgetIds.TfnValidatorWidgetId;

        public static async Task Run(IHost host)
        {
            var widgetsRepository = host.Services.GetRequiredService<IWidgetRepository>();

            // Tfn generator widget
            if(await widgetsRepository.Get(TfnGeneratorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Generate a random TFN", Name = "TFN Generator", WidgetId = TfnGeneratorWidgetId }, string.Empty);
            }

            // Tfn validator widget
            if (await widgetsRepository.Get(TfnValidatorWidgetId, string.Empty) == null)
            {
                await widgetsRepository.Create(new WidgetManagementData.Models.Widget { Description = "Validate a TFN", Name = "TFN Validator", WidgetId = TfnValidatorWidgetId }, string.Empty);
            }
        }
    }
}
