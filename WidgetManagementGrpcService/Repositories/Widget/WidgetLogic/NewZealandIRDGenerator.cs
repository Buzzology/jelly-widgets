using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class NewZealandIRDGenerator
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


        /* https://github.com/jarden-digital/nz-ird-validator */
        internal static string CheckDigit(char[] partialIRD)
        {
            var weights = new int[] { 3, 2, 7, 6, 5, 4, 3, 2 };
            var sum = 0;

            for (var i = 0; i < partialIRD.Length; i++)
            {
                sum += int.Parse(partialIRD[i].ToString()) * weights[i];
            }

            var initialRemaining = sum % 11;
            if (initialRemaining != 10)
            {
                return initialRemaining == 0 ? "0" : $"{11 - initialRemaining}";
            }

            // We need to recalculate the check digit if the remainder is 10
            weights = new int[] { 7, 4, 3, 2, 5, 2, 7, 6 };
            sum = 0;

            for (var i = 0; i < partialIRD.Length; i++)
            {
                sum += int.Parse(partialIRD[i].ToString()) * weights[i];
            }

            var secondaryRemaining = sum % 11;
            if(secondaryRemaining == 1)
            {
                throw new InvalidOperationException("The second check digit cannot be 10.");
            }

            return secondaryRemaining == 0 ? "0" : $"{11 - secondaryRemaining}";
        }


        public static async Task<Dictionary<string, string>> Process(Dictionary<string, string> payloads)
        {
            int iterationCount = 0;

            do
            {
                iterationCount++;

                try
                {
                    return await Get();
                }
                catch (InvalidOperationException)
                {
                    Console.WriteLine("Invalid IRD generated, trying again.");
                }
            } while (iterationCount< 100);

            return new Dictionary<string, string>
            {
                { "valid", "false" },
                { "message", "Failed to find a valid IRD within a reasonable number of attempts." },
                { "requestValue", string.Empty },
            };
        }


        public static async Task<Dictionary<string, string>> Get()
        {
            // https://stackoverflow.com/a/15823818/522859
            var partialIRD = WidgetLogicHelpers.RandomDigitsInRange(1_000_000, 15_000_000).ToArray();
            if (partialIRD.Length == 7)
            {
                partialIRD = $"0{new string(partialIRD)}".ToCharArray();
            }

            var checkDigit = new string(CheckDigit(partialIRD));

            if ($"{new string(partialIRD)}{checkDigit}".Length >= 10)
            {
                var test = 3;
            }
            return new Dictionary<string, string>
            {
                { "valid", "true" },
                { "message", string.Empty },
                { "requestValue", string.Empty },
                { "response", $"{new string(partialIRD)}{checkDigit}" },
                { "checkDigit", checkDigit.ToString() },
            };
        }
    }
}