using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementGrpcService.Repositories.Widget.WidgetLogic
{
    public static class WidgetLogicHelpers
    {
        /* https://stackoverflow.com/a/30884633/522859*/
        public static string RandomDigits(int length, int max = 10)
        {
            var random = new Random();
            string s = string.Empty;
            for (int i = 0; i < length; i++)
                s = string.Concat(s, random.Next(max).ToString());
            return s;
        }

        /* https://stackoverflow.com/a/3975307/522859 */
        public static string RandomDigitsInRange(int min, int max)
        {
            Random r = new Random();
            int randomInt = r.Next(min, max);

            return randomInt.ToString();
        }
    }
}
