using System.ComponentModel.DataAnnotations.Schema;

namespace Crash.Models.Entities
{
    public class Image
    {
        public int Id { get; set; }
        [ForeignKey("AccidentId")] 
        public Guid AccidentId { get; set; }
        public byte[] ImageData { get; set; }
    }
}
