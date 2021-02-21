using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianBusinessNumberValidator
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

        public static Dictionary<string, string> ReturnSuccessResponse(string message, string requestValue)
        {
            return new Dictionary<string, string>
            {
                { "valid", "true" },
                { "message", message },
                { "requestValue", requestValue },
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
            if(payloads == null || payloads.Count == 0)
            {
                return ReturnErrorResponse($"{nameof(payloads)} must have a value.", "");
            }

            if (!payloads.ContainsKey("abn"))
            {
                return ReturnErrorResponse($"ABN has not been provided.", "");
            }

            var abn = payloads["abn"];
            if (string.IsNullOrWhiteSpace(abn))
            {
                return ReturnErrorResponse($"ABN value has not been provided.", abn);
            }

            if (abn.Length != 11)
            {
                return ReturnErrorResponse($"ABN should be 11 characters.", abn);
            }

            if(!long.TryParse(abn, out _))
            {
                return ReturnErrorResponse($"ABN should be all digits.", abn);
            }

            var checkDigits = abn.Substring(0, 2);
            var partialAbn = abn.Substring(2, 9);

            if(int.Parse(checkDigits) != int.Parse(CheckDigits(partialAbn.ToArray())))
            {
                return ReturnErrorResponse($"ABN checksum failed.", abn);
            }

            return ReturnSuccessResponse("Valid ABN", abn);
        }
    }
}
