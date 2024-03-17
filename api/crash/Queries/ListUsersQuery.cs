using Crash.Models.Dtos;
using Crash.Models.Entities;
using MediatR;

namespace Crash.Queries;
public class ListUsersQuery : IRequest<List<CrashUserDto>> {

}