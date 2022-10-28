using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CoMuteV2.Api.Filters
{
    public class ErrorHandlingFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
           var exception = context.Exception;

            context.Result = new ObjectResult(new { error = "An error has occured processing your request" })
            {
                StatusCode = 500
            };
            context.ExceptionHandled = true;
        }
    }
}
