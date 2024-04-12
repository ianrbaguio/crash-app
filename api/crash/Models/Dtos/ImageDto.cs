namespace Crash.Models.Dtos
{
    public class ImageDto
    {
        public Guid AccidentId { get; set; }
        public List<IFormFile> Images { get; set; }
    }

}
