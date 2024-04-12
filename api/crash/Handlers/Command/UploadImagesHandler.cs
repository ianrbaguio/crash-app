using AutoMapper;
using Crash.Repositories.IRepositories;
using MediatR;
using Crash.Commands;
using Crash.Models;
using Crash.Repositories;
using Crash.Database;
using Crash.Models.Dtos;
using Crash.Models.Entities;

namespace Crash.Handlers.Command
{

    public class UploadImagesHandler : IRequestHandler<UploadImages, ImageDto>
    {
        private readonly IAccidentRepository _accidentRepository;
 

        public UploadImagesHandler( IAccidentRepository accidentRepository)
        {
            _accidentRepository = accidentRepository;
        }

        public async Task<ImageDto> Handle(UploadImages request, CancellationToken cancellationToken)
        {
          
            await _accidentRepository.AddAccidentImagesAsync(request.Images, request.AccidentId);
            return new ImageDto() { AccidentId = request.AccidentId, Images=request.Images };
        }
    }
}
