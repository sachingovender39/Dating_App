using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,IHostEnvironment env )
        {
            Next = next;
            Logger = logger;
            Env = env;
        }

        private readonly RequestDelegate Next;
        private readonly ILogger<ExceptionMiddleware> Logger ;
        private readonly IHostEnvironment Env ;

        public async Task InvokeAsync(HttpContext context){
            try
            {
                await Next(context);
            }
            catch(Exception ex)
            {
                Logger.LogError(ex,ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode=(int) HttpStatusCode.InternalServerError;

                var response = Env.IsDevelopment()? new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString()): new ApiException(context.Response.StatusCode,"internal server error");

                var options = new JsonSerializerOptions{ PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response,options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}