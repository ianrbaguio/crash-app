using Crash.Repositories.IRepositories;
using MediatR;
using OpenCvSharp;
using OpenCvSharp.Extensions;
using System.Drawing;
using Crash.Commands;
using Crash.Models.Dtos;
namespace Crash.Handlers.Command
{
    public class MergeAccidentImagesHandler : IRequestHandler<MergeAccidentImages, byte[]>
    {
        private readonly IAccidentRepository _accidentRepository;

        public MergeAccidentImagesHandler(IAccidentRepository accidentRepository)
        {
            _accidentRepository = accidentRepository;
        }

        public async Task<byte[]> Handle(MergeAccidentImages request, CancellationToken cancellationToken)
        {
            List<IFormFile> streetViewImages = new List<IFormFile> { request.StreetViewImage };
            byte[] mergedImage = await _accidentRepository.MergeAccidentImagesAsync(streetViewImages, request.AccidentImages);
            return mergedImage;
        }
    }
}
