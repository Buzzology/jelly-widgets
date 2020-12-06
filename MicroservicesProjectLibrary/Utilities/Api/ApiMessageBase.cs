using System;
using System.Collections.Generic;
using System.Text;

namespace MicroservicesProjectLibrary.Utilities.Api
{
    public class ApiMessageBase
    {
        public int Page { get; set; }
        public int MaxPageSize { get; set; }
    }
}
