using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianTFNValidator
    {
        public static Dictionary<string, string> ReturnErrorResponse(string error)
        {
            return new Dictionary<string, string>
            {
                { "valid", "false" },
                { "message", error },
            };
        }


        public static async Task<Dictionary<string, string>> Validate(Dictionary<string, string> payloads)
        {
            if (payloads == null || payloads.Count == 0)
            {
                return ReturnErrorResponse($"{nameof(payloads)} must have a value.");
            }

            if (!payloads.ContainsKey("tfn"))
            {
                return ReturnErrorResponse($"{nameof(payloads)} tfn has not been provided.");
            }

            var tfn = payloads["tfn"];
            if (string.IsNullOrWhiteSpace(tfn))
            {
                return ReturnErrorResponse($"{nameof(payloads)} tfn value has not been provided.");
            }

            if (tfn.Length != 9)
            {
                return ReturnErrorResponse($"{nameof(payloads)} tfn should be 9 characters.");
            }

            var tfnChars = tfn.ToArray();
            var weightedSum = 0;

            for (var i = 0; i < tfnChars.Length; i++)
            {
                if (!int.TryParse(tfnChars[i].ToString(), out var validNumber))
                {
                    return ReturnErrorResponse($"{nameof(payloads)} tfn character number {i + 1} should be a valid number.");
                }

                if (validNumber > 9)
                {
                    return ReturnErrorResponse($"{nameof(payloads)} tfn character number {i + 1} should be less than or equal to 9.");
                }

                if (validNumber < 0)
                {
                    return ReturnErrorResponse($"{nameof(payloads)} tfn character number {i + 1} should be more than or equal to 0.");
                }

                // All but the last digit are multiplied by their index + 1
                if (i < tfnChars.Length - 1)
                {
                    weightedSum += (i + 1) * validNumber;
                }
                else
                {
                    // The last digit is simply multiplied by two
                    weightedSum += 2 * validNumber;
                }
            }

            if (weightedSum % 11 != 0)
            {
                return ReturnErrorResponse($"Invalid TFN - checksum algorithm does not pass.");
            }

            return new Dictionary<string, string>
            {
                { "valid", "true" }
            };
        }
    }
}
