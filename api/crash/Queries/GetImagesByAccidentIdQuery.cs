using Crash.Models.Dtos;
using MediatR;

namespace Crash.Queries;
public class GetImagesByAccidentIdQuery : IRequest<AccidentImageDto> {
    public Guid AccidentId;
}