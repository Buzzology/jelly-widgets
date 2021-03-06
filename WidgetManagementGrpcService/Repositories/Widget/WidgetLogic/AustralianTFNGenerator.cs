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

        internal static string CheckDigit(char[] partialTFN)
        {
            var weights = new int[] { 1, 4, 3, 7, 5, 8, 6, 9 };
            var sum = 0;

            for (var i = 0; i < partialTFN.Length; i++)
            {
                sum += int.Parse(partialTFN[i].ToString()) * weights[i];
            }

            var remaining = sum % 11;
            if(remaining == 10)
            {
                throw new InvalidOperationException("Check digit can't be 10");
            }

            return $"{remaining}";
        }


        public static async Task<Dictionary<string, string>> Process(Dictionary<string, string> payloads)
        {
            int iterationCount = 0;            

            do
            {
                iterationCount++;

                try
                {
                    var partialTFN = WidgetLogicHelpers.RandomDigits(8).ToArray();
                    var checkDigit = CheckDigit(partialTFN);

                    return new Dictionary<string, string>
                    {
                        { "valid", "true" },
                        { "requestValue", string.Empty },
                        { "response", $"{new string(partialTFN)}{new string(checkDigit)}" },
                        {"checkDigit", checkDigit },
                        { "message", "Valid Australian TFN" }
                    };
                }
                catch (InvalidOperationException)
                {
                    Console.WriteLine("Invalid IRD generated, trying again.");
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
