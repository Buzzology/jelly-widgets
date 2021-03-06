using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class AustralianTFNValidator
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
            // TODO: (CJO) 8 digit tfn: file:///C:/Users/Chris/Downloads/Tax_file_number_.TFN._algorithm_8_digit.pdf

            if (payloads == null || payloads.Count == 0)
            {
                return ReturnErrorResponse($"{nameof(payloads)} must have a value.", "");
            }

            if (!payloads.ContainsKey("tfn"))
            {
                return ReturnErrorResponse($"TFN has not been provided.", "");
            }

            var tfn = payloads["tfn"];
            if (string.IsNullOrWhiteSpace(tfn))
            {
                return ReturnErrorResponse($"TFN value has not been provided.", tfn);
            }

            if (tfn.Length != 9)
            {
                return ReturnErrorResponse($"TFN should be 9 characters.", tfn);
            }

            if (!long.TryParse(tfn, out _))
            {
                return ReturnErrorResponse($"TFN should be all digits.", tfn);
            }

            #region Special cases: https://www.ato.gov.au/Forms/PAYG-payment-summary---individual-non-business/?page=3

            if (tfn == "111111111")
            {
                return ReturnSuccessResponse("Valid non-declared TFN for a new payee.", tfn);
            }

            if (tfn == "333333333")
            {
                return ReturnSuccessResponse("Valid under 18 TFN.", tfn);
            }

            if (tfn == "444444444")
            {
                return ReturnSuccessResponse("Valid Australian Goverment pensioner TFN.", tfn);
            }

            if (tfn == "000000000")
            {
                return ReturnSuccessResponse("Valid refusal to declare TFN.", tfn);
            }

            #endregion

            try
            {
                var checkDigit = AustralianTFNGenerator.CheckDigit(tfn.Substring(0, 8).ToCharArray());
                if(checkDigit == tfn.Substring(8, 1))
                {
                    return ReturnSuccessResponse("Valid standard Australian TFN", tfn);
                }
            }
            catch(InvalidOperationException)
            {
                return ReturnErrorResponse($"Invalid TFN - checksum algorithm does not pass.", tfn);
            }

            return ReturnErrorResponse($"Invalid TFN - checksum algorithm does not pass.", tfn);
        }
    }
}
