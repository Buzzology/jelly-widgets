using Grpc.Core;
using MicroservicesProjectLibrary.Utilities.Api;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;

namespace MicroservicesProjectLibrary.Utilities.Startup
{
    /* https://stackoverflow.com/a/38935583/522859 */
    public class ApiErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ApiErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            System.Diagnostics.Debugger.Break();

            if (!context.Response.HasStarted)
            {
                HttpStatusCode code = HttpStatusCode.InternalServerError;
                var message = string.Empty;

                // Check if it's a grpc exception
                if (ex is RpcException)
                {
                    var rpcException = (RpcException)ex;
                    message = rpcException?.Status.Detail;

                    if (rpcException.StatusCode == StatusCode.InvalidArgument) code = HttpStatusCode.BadRequest;
                    else if (rpcException.StatusCode == StatusCode.PermissionDenied) code = HttpStatusCode.Unauthorized;
                    else if (rpcException.StatusCode == StatusCode.NotFound) code = HttpStatusCode.NotFound;
                    else if (rpcException.StatusCode == StatusCode.InvalidArgument) code = HttpStatusCode.BadRequest;
                    else
                    {
                        code = HttpStatusCode.InternalServerError;
                        message = string.Empty;
                    }
                }

                if (string.IsNullOrWhiteSpace(message))
                {
                    code = HttpStatusCode.InternalServerError;
                    message = "An error has occurred.";
                }

                var result = JsonConvert.SerializeObject(
                    new ApiMessageResponseBase(null) {
                        Messages = new List<UserMessage> { new UserMessage(message, UserMessage.MessageType.Error) }
                    }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() } );
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)code;

                return context.Response.WriteAsync(result);
            }

            return Task.CompletedTask;
        }
    }
}
