using Crash.Models.Entities;
using MediatR;
using Crash.Commands;
using Crash.Models.Dtos;
using AutoMapper;
using Crash.Repositories.IRepositories;

namespace Crash.Handlers.Command
{
    public class CreateAccidentHandler : IRequestHandler<CreateAccident, AccidentDto>
    {
        private readonly IAccidentRepository _accidentRepository;
        private readonly IMapper _mapper;
        public CreateAccidentHandler(IMapper mapper, IAccidentRepository accidentRepository)
        {
            _accidentRepository = accidentRepository;
            _mapper = mapper;

        }
        public async Task<AccidentDto> Handle(CreateAccident command, CancellationToken cancellationToken)
        {
            var accident = new Accident()
            {
                AccidentId = command.Accident_id,
                Location = command.Location,
                AccidentDate = command.Accident_date,
                Daylight = command.Daylight,
                Weather = command.Weather,
                EstimatedCost = command.Estimated_cost,
                NumberOfParties = command.Number_of_parties,
                Latitude = command.Latitude,
                Longitude = command.Longitude,
                Parties = command.Parties

            };
            Accident _accident= await _accidentRepository.AddAccidentAsync(accident);
            return _mapper.Map<AccidentDto>(accident);
        }
    }
}
