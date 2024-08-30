using Crash.Models.Dtos;
using MediatR;
using Crash.Models;
using System;
namespace Crash.Queries;
public class GetAccidentsByRegionQuery : IRequest<List<AccidentDto>>
{
    public double North;
    public double South;
    public double West;
    public double East;
}
