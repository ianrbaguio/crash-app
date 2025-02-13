using Crash.Commands;
using Crash.Models.Dtos;
using Crash.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using static Crash.Commands.CreateAccident;

namespace Crash.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class AccidentsController : ControllerBase
   {
      private readonly IMediator _mediatr;

      public AccidentsController(IMediator mediatr)
      {
         _mediatr = mediatr;
      }

      [HttpGet(Name = "GetAccidents")]
      public async Task<List<AccidentDto>> GetAccidentsAsync()
      {
         var accidents = await _mediatr.Send(new GetAccidentsQuery());

         return accidents;
      }
 
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
 
        [HttpPost]
        public async Task<AccidentDto> AddAccidentAsync([FromBody] AccidentDto accident)
        {

            var command = new CreateAccident { Accident = accident, PartyDetails = accident.parties };
            var _accident = await _mediatr.Send(command);
            return _accident;
        }
        [HttpPost("uploadImages")]
        public async Task<IActionResult> UploadImages([FromForm] ImageDto image)
        {
 
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

    [HttpGet("ById", Name = "GetAccidentById")]
      public async Task<AccidentDto> GetAccidentByIdAsync([FromQuery] Guid id)
      {
         var accident = await _mediatr.Send(new GetAccidentByIdQuery() {Id = id});

         return accident;
      }

      [HttpGet("images", Name = "GetImagesByAccidentId")]
      public async Task<AccidentImageDto> GetImagesByAccidentIdAsync([FromQuery] Guid accidentId)
      {
        AccidentImageDto imageDto = await _mediatr.Send(new GetImagesByAccidentIdQuery() {AccidentId = accidentId});        
         return imageDto;
      }

        [HttpPost("mergeImages")]
        public async Task<IActionResult> MergeAccidentImages([FromForm] IFormFile streetViewImage, [FromForm] List<IFormFile> accidentImages, [FromForm] Guid accidentId)
        {
            try
            {
                var mergedImage = await _mediatr.Send(new MergeAccidentImages
                {
                    StreetViewImage = streetViewImage,
                    AccidentImages = accidentImages,
                    AccidentId = accidentId
                });

                return File(mergedImage, "image/png");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error merging images.");
            }
        }
    }
}
