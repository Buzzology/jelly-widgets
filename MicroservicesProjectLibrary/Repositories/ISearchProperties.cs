using System;

namespace MicroservicesProjectLibrary.Repositories
{
    public interface ISearchProperties
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string Text { get; set; }

        public string UserId { get; set; }
    }
}
