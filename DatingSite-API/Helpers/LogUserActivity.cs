using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingSite_API.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DatingSite_API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var result = await next();

            IUserRepository repo = result.HttpContext.RequestServices.GetService(typeof(IUserRepository)) as IUserRepository;
            var userId =int.Parse(result.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = await repo.GetUser(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}