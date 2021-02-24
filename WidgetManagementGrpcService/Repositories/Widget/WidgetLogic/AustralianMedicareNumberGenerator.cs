using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianMedicareNumberGenerator
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
            // https://stackoverflow.com/a/15823818/522859
            var partialMedicareNumber = WidgetLogicHelpers.RandomDigits(7).ToArray();

            // We then need a random first digit between 2 and 6
            var firstCharacter = (int.Parse(WidgetLogicHelpers.RandomDigits(1, 4)) + 2).ToString();
            partialMedicareNumber = (firstCharacter + new string(partialMedicareNumber)).ToCharArray();

            // Gather medicare number parts
            var checkDigit = new string(CheckDigit(partialMedicareNumber));
            var medicareNumber = $"{new string(partialMedicareNumber)}{checkDigit}";
            var issueNumber = Convert.ToString(int.Parse(WidgetLogicHelpers.RandomDigits(1, 8)) + 1);
            var referenceNumber = Convert.ToString(int.Parse(WidgetLogicHelpers.RandomDigits(1, 8)) + 1);

            return new Dictionary<string, string>
            {
                { "valid", "true" },
                { "message", string.Empty },
                { "requestValue", string.Empty },
                { "response", $"{medicareNumber}{issueNumber}/{referenceNumber}" },
                { "medicareNumber", $"{medicareNumber}" },
                { "checkDigit", checkDigit.ToString() },
                { "issueNumber", issueNumber.ToString() },
                { "referenceNumber", referenceNumber.ToString() },
            };
        }
    }
}