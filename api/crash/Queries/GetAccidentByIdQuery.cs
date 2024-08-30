using Crash.Models.Dtos;
using MediatR;

namespace Crash.Queries;
public class GetAccidentByIdQuery : IRequest<AccidentDto> {
    public Guid Id;
}