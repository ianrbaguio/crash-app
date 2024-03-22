using Microsoft.AspNetCore.Components.Routing;

namespace Crash.Models.Entities
{
   public class Accident
   {
      public Guid id {get; set;}
      public int accident_id {get; set;}
      public string location {get; set;}

      public DateTime accident_date {get; set;}

      public string daylight {get; set;}
      public double estimated_cost {get; set;}
      public int number_of_parties {get; set;}
      public List<string> parties { get; set;} = new List<string>();
   }
}
