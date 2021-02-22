using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianCompanyNumberGenerator
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

        public static Dictionary<string, string> ReturnSuccessResponse(string response)
        {
            return new Dictionary<string, string>
            {
                { "valid", "true" },
                { "message", string.Empty },
                { "requestValue", string.Empty },
                { "response", response },
            };
        }


        internal static string CheckDigits(char[] partialAbn)
        {
            var weights = new int[] { 8, 7, 6, 5, 4, 3, 2, 1 };
            var sum = 0;

            for (var i = 0; i < partialAbn.Length; i++)
            {
                sum += int.Parse(partialAbn[i].ToString()) * weights[i];
            }

            var remaining = 10 - sum % 10;
            return remaining == 10 ? "0" : $"{remaining}";
        }


        public static async Task<Dictionary<string, string>> Process(Dictionary<string, string> payloads)
        {
            var partialBusinessNumber = WidgetLogicHelpers.RandomDigits(8).ToArray();
            var checkDigits = CheckDigits(partialBusinessNumber);

            return ReturnSuccessResponse($"{new string(partialBusinessNumber)}{checkDigits}");
        }
    }
}
