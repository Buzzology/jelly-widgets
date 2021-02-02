using Grpc.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Serilog;

namespace MicroservicesProjectLibrary.Utilities
{
    public static class LibraryHelpers
    {
        public static RpcException GenerateRpcException(Exception ex)
        {
            StatusCode statusCode;
            if (ex is ArgumentException)
            {
                statusCode = StatusCode.InvalidArgument;
            }
            else if (ex is UnauthorizedAccessException)
            {
                statusCode = StatusCode.PermissionDenied;
            }
            else if (ex is KeyNotFoundException)
            {
                statusCode = StatusCode.NotFound;
            }
            else if (ex is FormatException)
            {
                statusCode = StatusCode.InvalidArgument;
            }
            else {

                Log.Error(ex, $"An unexpected exception has occurred in a grpc call: ${ex.Message}");
                Console.WriteLine($"An unexpected exception has occurred in a grpc call: {ex.Message}. {ex.StackTrace}");

                // Default should not provide any internal information
                return new RpcException(new Status(StatusCode.Internal, "Unexpected error."));
            }

            var status = new Status(statusCode, ex.Message);
            var exceptionName = ex.GetType().Name;

            var rpcMetadata = new Metadata
            {
                { "exception_name", exceptionName }
            };

            return new RpcException(status, rpcMetadata);
        }        


        /* Url friendly guids: https://stackoverflow.com/a/9279005/522859, https://madskristensen.net/blog/A-shorter-and-URL-friendly-GUID */
        public static class UrlFriendlyGuid
        {
            public static string Generate()
            {
                return Encode(Guid.NewGuid());
            }

            public static string Encode(string guidText)
            {
                Guid guid = new Guid(guidText);
                return Encode(guid);
            }

            public static string Encode(Guid guid)
            {
                string enc = Convert.ToBase64String(guid.ToByteArray());
                enc = enc.Replace("/", "_");
                enc = enc.Replace("+", "-");
                return enc.Substring(0, 22);
            }

            public static Guid Decode(string encoded)
            {
                encoded = encoded.Replace("_", "/");
                encoded = encoded.Replace("-", "+");
                byte[] buffer = Convert.FromBase64String(encoded + "==");
                return new Guid(buffer);
            }
        }


        /* Used to get all capital letters from a string */
        public static string GetCapitalLetters(string input)
        {
            return string.Concat(input.Where(c => c >= 'A' && c <= 'Z'));
        }


        public static string GetRedixCacheKeyPrefix(Type objectType)
        {
            return $"{GetCapitalLetters(Assembly.GetExecutingAssembly().GetName().Name)}:{objectType.Name}";
        }


        /* Used to generate keys to store by in redix */
        public static string GetRedisCacheKey(object objectToStore)
        {
            var type = objectToStore.GetType();
            string key = GetRedixCacheKeyPrefix(type);
            
            IList<PropertyInfo> props = new List<PropertyInfo>(type.GetProperties());
            foreach (PropertyInfo prop in props)
            {
                object propValue = prop.GetValue(objectToStore, null);
                key += $":{GetCapitalLetters(prop.Name)}:{propValue}";
            }

            return key;
        }


        /* https://stackoverflow.com/a/2921135/522859 */
        public static string GenerateSlug(this string phrase)
        {
            string str = RemoveDiacritics(phrase).ToLower();
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim 
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            return str;
        }


        static string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }


        public static bool IsValidImageExtension(string filename)
        {
            /* Check the image extension */
            if (Path.GetExtension(filename).ToLower() != ".jpg"
                && Path.GetExtension(filename).ToLower() != ".png"
                && Path.GetExtension(filename).ToLower() != ".gif"
                && Path.GetExtension(filename).ToLower() != ".jpeg")
            {
                return false;
            }

            return true;
        }


        /* https://stackoverflow.com/a/20415794/522859 */
        public static string Truncate(string input, int maxLength = 25, bool includeEllipsis = true)
        {
            if (input == null) return string.Empty;
            if (input.Length <= maxLength) return input;
            if (includeEllipsis)
            {
                return string.Concat(input.Substring(0, maxLength - 3), "...");
            }

            return string.Concat(input.Take(maxLength));
        }
    }
}
