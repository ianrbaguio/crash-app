using Crash.Commands;
using Crash.Models.Dtos;
using Crash.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;

namespace Crash.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class AccidentsController : ControllerBase
   {
      private readonly IMediator _mediatr;

      public AccidentsController(IMediator meaditr)
      {
         _mediatr = meaditr;
      }

      [HttpGet(Name = "GetAccidents")]
      public async Task<List<AccidentDto>> GetAccidentsAsync()
      {
         var accidents = await _mediatr.Send(new GetAccidentsQuery());

         return accidents;
      }
<<<<<<< HEAD
      [HttpGet("ByRegion", Name = "GetAccidentsByRegion")]
      public async Task<List<AccidentDto>> GetAccidentsByRegionAsync(
            [FromQuery] double north,
            [FromQuery] double south,
            [FromQuery] double east,
            [FromQuery] double west)
        {
            var accidents = await _mediatr.Send(new GetAccidentsByRegionQuery()
            {
                North = north,
                South = south,
                East = east,
                West = west

            });

            return accidents;
          }
=======

>>>>>>> b37bd723427a12c3ee36a1b9457cea2e3b700c5d
        [HttpPost]
        public async Task<AccidentDto> AddAccidentAsync([FromBody] AccidentDto accident)
        {

            var _accident = await _mediatr.Send(new CreateAccident()
            {
                Accident_id = accident.AccidentId,
                Location = accident.Location,
                Accident_date = accident.AccidentDate,
                Daylight = accident.Daylight,
                Weather = accident.Weather,
                Estimated_cost = accident.EstimatedCost,
                Number_of_parties = accident.NumberOfParties,
                Latitude = accident.Latitude,
                Longitude = accident.Longitude,
                Parties = accident.Parties

            }
              );
            return _accident;
        }
        [HttpPost("uploadImages")]
        public async Task<IActionResult> UploadImages([FromForm] ImageDto image)
        {
<<<<<<< HEAD
=======


>>>>>>> b37bd723427a12c3ee36a1b9457cea2e3b700c5d
            try
            {


                var uploadedImageUrls = await _mediatr.Send(new UploadImages()
                {
                    AccidentId = image.AccidentId,
                    Images = image.Images
                }
                );
                return Ok(uploadedImageUrls);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading images.");
            }
        }
    }
}
