using Crash.Models.Entities;
using MediatR;
using Microsoft.VisualBasic;
using Crash.Models.Dtos;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.IO;
using static Crash.Commands.CreateAccident;
namespace Crash.Commands
{
    public class CreateAccident : IRequest<AccidentDto>
    {   
        public AccidentDto Accident { get; set; }

      public List<PartyDetailDto> PartyDetails { get; set; } = [];

    }
}
