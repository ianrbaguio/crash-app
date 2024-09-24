using Crash.Queries;
using Crash.Models.Dtos;
using MediatR;
using Crash.Repositories.IRepositories;
using AutoMapper;
using Crash.Models.Entities;
using System.IO;

namespace Crash.Query.Handlers
{
 
   public class GetAccidentsQueryHandler : IRequestHandler<GetAccidentsQuery, List<AccidentDto>> , IRequestHandler<GetAccidentsByRegionQuery, List<AccidentDto>>,  IRequestHandler<GetAccidentByIdQuery, AccidentDto>
    {
 
 
        private readonly IAccidentRepository _accidentRepository;
        private readonly IMapper _mapper;
        public GetAccidentsQueryHandler(IMapper mapper, IAccidentRepository accidentRepository)
        {
            _accidentRepository = accidentRepository;
            _mapper = mapper;
         }

      public async Task<List<AccidentDto>> Handle(GetAccidentsQuery query, CancellationToken cancellationToken)

      {
 
         var accidents = await _accidentRepository.GetAccidentListAsync();
         return _mapper.Map<List<AccidentDto>>(accidents);
        }


        public async Task<List<AccidentDto>> Handle(GetAccidentsByRegionQuery query, CancellationToken cancellationToken)

        {
            List<AccidentDto> data = new List<AccidentDto>();

            var accidents = await _accidentRepository.GetAccidentListByRegionAsync(query.North, query.South, query.East, query.West);

            return _mapper.Map<List<AccidentDto>>(accidents);
        }

        public async Task<AccidentDto> Handle(GetAccidentByIdQuery query, CancellationToken cancellationToken)

        {
  
            var accidents = await _accidentRepository.GetAccidentByIdAsync(query.Id);

            AccidentDto data = _mapper.Map<AccidentDto>(accidents);
            List<Party> parties = await _accidentRepository.GetAccidentPartiesAsync(query.Id);
            if (parties != null)
            {
               data.parties = new List<PartyDetailDto>();
               foreach(var party in parties) 
                    data.parties.Add(_mapper.Map<PartyDetailDto>(party));
            }
           
            return data;
        }
    }
 
}
