using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianMedicareNumberValidator
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


        internal static string CheckDigit(char[] partialMedicareNumber)
        {
            var weights = new int[] { 1, 3, 7, 9, 1, 3, 7, 9 }; // NOTE: The first digit is used as value so we pass 1 for the check digit
            var sum = 0;

            for (var i = 0; i < partialMedicareNumber.Length; i++)
            {
                sum += int.Parse(partialMedicareNumber[i].ToString()) * weights[i];
            }

            var remaining = sum % 10;
            return remaining == 10 ? "0" : $"{remaining}";
        }


        public static async Task<Dictionary<string, string>> Process(Dictionary<string, string> payloads)
        {
            if (payloads == null || payloads.Count == 0)
            {
                return ReturnErrorResponse($"{nameof(payloads)} must have a value.", "");
            }

            if (!payloads.ContainsKey("medicareNumber"))
            {
                return ReturnErrorResponse($"A medicare number has not been provided.", "");
            }

            var inputValue = payloads["medicareNumber"];
            if (string.IsNullOrWhiteSpace(inputValue))
            {
                return ReturnErrorResponse($"Medicare number value has not been provided.", inputValue);
            }

            var medicareNumber = inputValue.Replace("/", "");
            if (medicareNumber.Length == 9)
            {
                return ReturnErrorResponse($"IRN and issue number are missing.", inputValue);
            }

            if (medicareNumber.Length == 10)
            {
                return ReturnErrorResponse($"IRN or issue number are missing.", inputValue);
            }

            if (medicareNumber.Length != 11)
            {
                return ReturnErrorResponse($"Medicare number should be 11 numbers.", inputValue);
            }

            if (!long.TryParse(medicareNumber, out _))
            {
                return ReturnErrorResponse($"Medicare number should be all digits.", inputValue);
            }

            var checkDigit = medicareNumber.Substring(8, 1);
            var partialMedicareNumber = medicareNumber.Substring(0, 8);

            if (checkDigit != CheckDigit(partialMedicareNumber.ToArray()))
            {
                return ReturnErrorResponse($"Medicare number checksum failed.", medicareNumber);
            }

            return ReturnSuccessResponse("Valid Medicare Number", medicareNumber);
        }
    }
}