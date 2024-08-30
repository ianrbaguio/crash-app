using Crash.Models.Dtos;
using MediatR;

namespace Crash.Commands
{
 
    public class UploadImages : IRequest<ImageDto>
    {
        public List<IFormFile> Images { get; set; }
        public Guid AccidentId { get; set; }
    }
}
