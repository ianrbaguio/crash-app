using Microsoft.AspNetCore.Components.Routing;
using static System.Net.Mime.MediaTypeNames;

namespace Crash.Models.Entities
{
    public class Accident
    {
        public Guid Id { get; set; }
        public int AccidentId { get; set; }
        public required string Location { get; set; }

        public DateTime AccidentDate { get; set; }

        public required string Daylight { get; set; }

        public required string Weather { get; set; }
        public double EstimatedCost { get; set; }
        public int NumberOfParties { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<string> Parties { get; set; } = new List<string>();

    }
}
