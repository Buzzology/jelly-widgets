using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianCompanyNumberValidator
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
            if (payloads == null || payloads.Count == 0)
            {
                return ReturnErrorResponse($"{nameof(payloads)} must have a value.", "");
            }

            if (!payloads.ContainsKey("acn"))
            {
                return ReturnErrorResponse($"A has not been provided.", "");
            }

            var acn = payloads["acn"];
            if (string.IsNullOrWhiteSpace(acn))
            {
                return ReturnErrorResponse($"ACN value has not been provided.", acn);
            }

            if (acn.Length != 9)
            {
                return ReturnErrorResponse($"ACN should be 9 characters.", acn);
            }

            if (!long.TryParse(acn, out _))
            {
                return ReturnErrorResponse($"ACN should be all digits.", acn);
            }

            var checkDigits = acn.Substring(8, 1);
            var partialAcn = acn.Substring(0, 8);

            if (checkDigits != CheckDigits(partialAcn.ToArray()))
            {
                return ReturnErrorResponse($"ACN checksum failed.", acn);
            }

            return ReturnSuccessResponse("Valid ACN", acn);
        }
    }
}