using MediatR;
using Microsoft.AspNetCore.Http;

namespace Crash.Commands
{
    public class MergeAccidentImages : IRequest<byte[]>
    {
        public IFormFile StreetViewImage { get; set; }
        public List<IFormFile> AccidentImages { get; set; }
        public Guid AccidentId { get; set; }
    }
}
