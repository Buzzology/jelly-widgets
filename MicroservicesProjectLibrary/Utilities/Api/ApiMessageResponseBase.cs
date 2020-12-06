using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

namespace MicroservicesProjectLibrary.Utilities.Api
{
    public class ApiMessageResponseBase : ApiMessageBase
    {
        public bool Success { get; set; }
        private List<UserMessage> _messages { get; set; }
        public List<UserMessage> Messages { get { return _messages ?? (_messages = new List<UserMessage>()); } set { _messages = value; } }
        public dynamic Data { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Nickname { get; set; }
        public long AuthTime { get; set; }
        public long ExpiresAt { get; set; }

        [JsonIgnore]
        public string EmailAddress { get; set; }

        public ApiMessageResponseBase(ClaimsPrincipal user)
        {
            if (user != null)
            {
                var userIdClaim = user.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier, StringComparison.InvariantCultureIgnoreCase));
                var emailAddressClaim = user.Claims.FirstOrDefault(x => x.Type.Equals("emails", StringComparison.InvariantCultureIgnoreCase));
                var usernameClaim = user.Claims.FirstOrDefault(x => x.Type.Equals("cognito:username", StringComparison.InvariantCultureIgnoreCase));
                var nicknameClaim = user.Claims.FirstOrDefault(x => x.Type.Equals("name", StringComparison.InvariantCultureIgnoreCase));
                var authTimeClaim = user.Claims.FirstOrDefault(x => x.Type.Equals("auth_time", StringComparison.InvariantCultureIgnoreCase));
                var expiryClaim = user.Claims.FirstOrDefault(x => x.Type.Equals("exp", StringComparison.InvariantCultureIgnoreCase));

                if (userIdClaim != null)
                {
                    UserId = userIdClaim.Value;
                }

                if (emailAddressClaim != null)
                {
                    EmailAddress = emailAddressClaim.Value;
                }

                if (usernameClaim != null)
                {
                    Username = usernameClaim.Value;
                }

                if (nicknameClaim != null)
                {
                    Nickname = nicknameClaim.Value;
                }

                if (authTimeClaim != null)
                {
                    if (long.TryParse(authTimeClaim.Value, out long authTime))
                    {
                        AuthTime = authTime;
                    }
                }

                if (expiryClaim != null)
                {
                    if (long.TryParse(expiryClaim.Value, out long expiry))
                    {
                        ExpiresAt = expiry;
                    }
                }
            }
        }

        public void AddError(string text)
        {
            Messages.Add(new UserMessage(text, UserMessage.MessageType.Error));
            Success = false;
        }

        public bool AtLeastError()
        {
            return Messages.Any(x => x.Type.Equals(UserMessage.MessageType.Error));
        }
    }
}
