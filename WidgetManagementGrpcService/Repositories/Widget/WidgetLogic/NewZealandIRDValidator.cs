using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class NewZealandIRDValidator
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


        public static async Task<Dictionary<string, string>> Process(Dictionary<string, string> payloads)
        {
            if (payloads == null || payloads.Count == 0)
            {
                return ReturnErrorResponse($"{nameof(payloads)} must have a value.", "");
            }

            if (!payloads.ContainsKey("ird"))
            {
                return ReturnErrorResponse($"An IRD has not been provided.", "");
            }

            var inputValue = payloads["ird"];
            if (string.IsNullOrWhiteSpace(inputValue))
            {
                return ReturnErrorResponse($"IRD value has not been provided.", inputValue);
            }

            var ird = inputValue;
            if (ird.Length < 8)
            {
                return ReturnErrorResponse($"IRD must be at least 8 numbers.", inputValue);
            }

            if (ird.Length > 9)
            {
                return ReturnErrorResponse($"IRD must be nore more than 9 numbers.", inputValue);
            }

            if (!long.TryParse(ird, out _))
            {
                return ReturnErrorResponse($"IRD number should be all digits.", inputValue);
            }

            if(long.Parse(ird) < 10_000_000)
            {
                return ReturnErrorResponse($"IRD must be greater than 9,999,999.", inputValue);
            }

            if (long.Parse(ird) > 150_000_000)
            {
                return ReturnErrorResponse($"IRD must be less than 150,000,001.", inputValue);
            }

            if (ird.Length == 8)
            {
                ird = $"0{ird}";
            }

            var checkDigit = ird.Substring(8, 1);
            try
            {
                if (checkDigit != NewZealandIRDGenerator.CheckDigit(ird.Substring(0, 8).ToArray()))
                {
                    return ReturnErrorResponse($"IRD checksum failed.", ird);
                }
            }
            catch (InvalidOperationException)
            {
                return ReturnErrorResponse($"IRD checksum failed.", ird);
            }

            return ReturnSuccessResponse("Valid IRD", ird);
        }
    }
}