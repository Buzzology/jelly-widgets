using System;
using System.Collections.Generic;
using System.Text;

namespace MicroservicesProjectLibrary.Utilities.Api
{
    public class UserMessage
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public MessageType Type { get; set; }


        public UserMessage() { }

        public UserMessage(string text, MessageType type)
        {
            Text = text;
            Type = type;
        }

        public UserMessage(string id, string text, MessageType type)
        {
            Id = id;
            Text = text;
            Type = type;
        }

        public enum MessageType
        {
            Error = 0,
            Success = 1,
            Information = 2,
            Warning = 3
        }

        public static string UserIdRequired()
        {
            return "A user id is required.";
        }
    }
}