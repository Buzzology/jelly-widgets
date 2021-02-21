using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianTFNGenerator
    {
        public static Dictionary<string, string> ReturnErrorResponse(string error, string requestValue)
        {
            return new Dictionary<string, string>
            {
                { "valid", "false" },
                { "message", error },
                { "requestValue", requestValue },
            };
        }


        public static async Task<Dictionary<string, string>> Process(Dictionary<string, string> payloads)
        {
            var tfn = WidgetLogicHelpers.RandomDigits(9).ToArray();
            int iterationCount = 0;
            var weights = new int[] { 1, 4, 3, 7, 5, 8, 6, 9, 10 };

            do
            {
                iterationCount++;

                // Increment the tfn
                tfn = Convert.ToString(int.Parse(tfn) + 1).Substring(0, 9).ToArray();

                // Loop through each number in the current tfn
                var sum = 0;
                for(var i = 0; i < tfn.Length; i++)
                {
                    sum += int.Parse(tfn[i].ToString()) * weights[i];
                }

                // Check if we've got a valid tfn
                if (sum % 11 == 0)
                {
                    return new Dictionary<string, string>
                    {
                        { "valid", "true" },
                        { "requestValue", string.Empty },
                        { "response", new string(tfn) },
                        { "message", "Valid Australian TFN" }
                    };
                }
            } while (iterationCount < 100);

            return new Dictionary<string, string>
            {
                { "valid", "false" },
                { "message", "Failed to find a valid TFN within a reasonable number of attempts." },
                { "requestValue", string.Empty },
            };
        }
    }
}
