using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WidgetManagementWebApi.Controllers.Messages
{
    public class ProcessMessageWebApiRequest
    {
        public Dictionary<string, string> Payloads { get; set; }
        public string DashboardWidgetId { get; set; }
        public string WidgetId { get; set; }

        public ProcessMessageWebApiRequest() { }
    }
}
