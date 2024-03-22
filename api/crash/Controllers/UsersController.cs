using Crash.Models.Dtos;
using Crash.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crash.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class UsersController : ControllerBase
   {
      private readonly IMediator _mediatr;

      public UsersController(IMediator meaditr)
      {
         _mediatr = meaditr;
      }

      [HttpGet]
      public async Task<List<CrashUserDto>> GetUsersAsync()
      {
         var users = await _mediatr.Send(new ListUsersQuery());

         return users;
      }
   }
}
