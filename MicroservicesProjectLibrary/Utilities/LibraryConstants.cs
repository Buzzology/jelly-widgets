using System;
using System.Collections.Generic;
using System.Text;

namespace MicroservicesProjectLibrary.Utilities
{
    public static class LibraryConstants
    {
        public const string IntegrationEventLogDbContextConnectionStringConfigKey = "integration-event-log-dbcontext-connection-string";

        public static class TagConstants
        {
            public const string TagPathSeparator = ";";
            public const int MaxNumberOfTagsPerSubject = 5;
        }

        public static class Entities
        {
            public enum EntityTypeEnum
            {
                User = 10,
                Topic = 20,
                Comment = 30,
                Post = 40,
            }
        }
    }
}