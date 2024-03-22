using Crash.Queries;
using Crash.Models.Dtos;
using MediatR;
using Crash.Database;
using Crash.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crash.Query.Handlers
{
    public class ListUsersQueryHandler : IRequestHandler<ListUsersQuery, List<CrashUserDto>>
    {

        private readonly AppDbContext _context;
        public ListUsersQueryHandler(AppDbContext context) {
            _context = context;
         }

        public async Task<List<CrashUserDto>> Handle(ListUsersQuery query, CancellationToken cancellationToken)
        {
            List<CrashUserDto> userDtos = new List<CrashUserDto>();

            List<CrashUser> users = await _context.crashuser.ToListAsync();

            return users.Select(user => new CrashUserDto(){Id = user.id, Username = user.username}).ToList();

        }
    }
}
