using System;

namespace MicroservicesProjectLibrary.Utilities
{
    public static class UrlFriendlyGuidStringExtension
    {
        public static string GetUrlFriendlyString(this Guid guid)
        {
            return LibraryHelpers.UrlFriendlyGuid.Encode(guid);
        }        
    }
}
