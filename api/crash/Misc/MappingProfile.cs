using AutoMapper;
using Crash.Models.Dtos;
using Crash.Models.Entities;


namespace Crash.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Accident, AccidentDto>();
            CreateMap<PartyDetailDto, Party>();
            CreateMap<AccidentDto, Accident>();
            CreateMap<Party, PartyDetailDto>();
            CreateMap<Party[], PartyDetailDto[]>();
        }
    }
}
