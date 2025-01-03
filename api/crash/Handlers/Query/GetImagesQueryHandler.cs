using Crash.Queries;
using Crash.Models.Dtos;
using MediatR;
using Crash.Database;
using Crash.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Crash.Repositories.IRepositories;
using AutoMapper;

namespace Crash.Query.Handlers
{
    public class GetImagesQueryHandler : IRequestHandler<GetImagesByAccidentIdQuery, AccidentImageDto>
    {        
        private readonly IAccidentRepository _accidentRepository;
        private readonly IMapper _mapper;
        public GetImagesQueryHandler(IMapper mapper, IAccidentRepository accidentRepository)
        {
            _accidentRepository = accidentRepository;
            _mapper = mapper;
         }
        public async Task<AccidentImageDto> Handle(GetImagesByAccidentIdQuery query, CancellationToken cancellationToken)
        {
            AccidentImageDto aImageDto = new AccidentImageDto();
            List<byte[]> imglist = new List<byte[]>();
          
            var images = await _accidentRepository.GetImagesByAccidentIdAsync(query.AccidentId);

             if (images!=null &&  images.Count > 0){
                //aImageDto.AccidentId = images[0].AccidentId;
                foreach (var img in images){
                    imglist.Add(img.ImageData);
                }
                //images.ForEach ()
                aImageDto.ImageList = imglist;
             }
            else
            {
                return new AccidentImageDto() {
                    AccidentId = query.AccidentId,
                    ImageList = imglist
                };
            }
            //System.Console.WriteLine ("GetImagesQueryHandler.handle return count..."  + imglist.Count);
           
            return aImageDto;
        }
    }
}
