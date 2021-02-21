using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianBusinessNumberGenerator
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
            var weights = new int[] { 3, 5, 7, 9, 11, 13, 15, 17, 19 };
            var sum = 0;

            for (var i = 0; i < partialAbn.Length; i++)
            {
                sum += int.Parse(partialAbn[i].ToString()) * weights[i];
            }

            return Convert.ToString((Math.Floor((decimal)sum / 89) + 1) * 89 + 10 - sum);
        }


        public static async Task<Dictionary<string, string>> Process(Dictionary<string, string> payloads)
        {
            var partialBusinessNumber = WidgetLogicHelpers.RandomDigits(9).ToArray();
            var checkDigits = CheckDigits(partialBusinessNumber);

            return ReturnSuccessResponse($"{checkDigits}{new string(partialBusinessNumber)}");
        }
    }
}
