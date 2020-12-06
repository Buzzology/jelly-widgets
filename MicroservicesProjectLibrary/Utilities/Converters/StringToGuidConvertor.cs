using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace MicroservicesProjectLibrary.Utilities.Converters
{
    public class StringToGuidConvertor : ITypeConverter<string, Guid>
    {
        public Guid Convert(string source, Guid destination, ResolutionContext context)
        {
            if (Guid.TryParse(source, out Guid result)) return result;

            return Guid.Empty;
        }
    }
}
