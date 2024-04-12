using Crash.Queries;
using Crash.Models.Dtos;
using MediatR;

namespace Crash.Query.Handlers
{
   public class GetAccidentsQueryHandler : IRequestHandler<GetAccidentsQuery, List<AccidentDto>>
   {
      public GetAccidentsQueryHandler() { }

      public async Task<List<AccidentDto>> Handle(GetAccidentsQuery query, CancellationToken cancellationToken)
      {
         List<AccidentDto> data = new List<AccidentDto>();

         AccidentDto accident1 = new AccidentDto() { 
            AccidentDate = new DateTime(), 
            Location = "Edmonton, AB",
            Daylight = "Sunny",
            };

         AccidentDto accident2 = new AccidentDto()
         {
            AccidentDate = new DateTime(),
            Location = "Spruce Grove, AB",
            Daylight = "Rainy",
         };

         data.Add(accident1);
         data.Add(accident2);

         return data;
      }
   }
}
