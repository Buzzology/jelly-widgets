using AutoMapper;
using Google.Protobuf.WellKnownTypes;
using System;

namespace MicroservicesProjectLibrary.Utilities.Converters
{
    public class BaseMappingProfile : Profile
    {
        public BaseMappingProfile()
        {
            CreateMap<DateTime, Timestamp>().ConvertUsing(x => Timestamp.FromDateTime(DateTime.SpecifyKind(x, DateTimeKind.Utc)));
            CreateMap<Timestamp, DateTime>().ConvertUsing(x => x != null ? x.ToDateTime() : DateTime.MinValue);
            CreateMap<string, string>().ConvertUsing(x => x != null ? x : string.Empty);
            CreateMap<string, Guid>().ConvertUsing(new StringToGuidConvertor());
        }
    }
}
