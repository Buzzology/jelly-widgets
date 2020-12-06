namespace MicroservicesProjectLibrary.Repositories
{
    public class SearchProperties : ISearchProperties
    {
        public SearchProperties()
        {
            PageNumber = 1;
            PageSize = 100;
        }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string Text { get; set; }

        public string UserId { get; set; }
    }
}
