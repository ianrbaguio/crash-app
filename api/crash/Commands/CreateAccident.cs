using Crash.Models.Entities;
using MediatR;
using Microsoft.VisualBasic;
using Crash.Models.Dtos;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
namespace Crash.Commands
{
    public class CreateAccident : IRequest<AccidentDto>
    {
        public int Accident_id { get; set; }
        public string Location { get; set; }
        public DateTime Accident_date { get; set; }
        public string Daylight { get; set; }
        public string Weather { get; set; }
        public double Estimated_cost { get; set; }
        public int Number_of_parties { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<string> Parties { get; set; } = new List<string>();

    }
}
