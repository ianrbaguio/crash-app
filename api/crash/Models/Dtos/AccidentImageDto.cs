namespace Crash.Models.Dtos
{
   public class AccidentImageDto
   {
        public Guid AccidentId { get; set; }
        public List<byte[]> ImageList { get; set; } = new List<byte[]>();
    }
}
