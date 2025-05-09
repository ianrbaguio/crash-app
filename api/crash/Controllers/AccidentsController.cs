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

      
      [HttpPost("upload-license")]
      public async Task<IActionResult> UploadLicenseImage(IFormFile file)
      {
        if (file == null || file.Length == 0)
        return BadRequest("No file uploaded.");

        try
        {
          // 1. Save image to OCR temp folder
          var apiBasePath = Directory.GetParent(Directory.GetCurrentDirectory())!.FullName;
          var ocrPath = Path.Combine(apiBasePath, "ocr");
          var ocrTempPath = Path.Combine(ocrPath, "temp");
          if (!Directory.Exists(ocrTempPath))
            Directory.CreateDirectory(ocrTempPath);

          var imagePath = Path.Combine(ocrTempPath, "license.png");

          using (var stream = new FileStream(imagePath, FileMode.Create))
          {
              await file.CopyToAsync(stream);
          }

          // 2. Call ocr.py with the image path
          var psi = new System.Diagnostics.ProcessStartInfo
          {
              FileName = "python",
              Arguments = $"ocr.py \"{imagePath}\"",
              WorkingDirectory = ocrPath, 
              RedirectStandardOutput = true,
              RedirectStandardError = true,
              UseShellExecute = false,
              CreateNoWindow = true
          };

          using var process = System.Diagnostics.Process.Start(psi);
          string output = await process.StandardOutput.ReadToEndAsync();
          string error = await process.StandardError.ReadToEndAsync(); 
          process.WaitForExit();

          if (process.ExitCode != 0)
          {
              Console.WriteLine("Python script failed:");
              Console.WriteLine(error);
              return StatusCode(500, $"Python script error: {error}");
          }
          Console.WriteLine("Python output:");
          Console.WriteLine(output);
          var result = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(output);
          return Ok(result);
    }
    catch (Exception ex)
    {
          return StatusCode(500, $"Server error: {ex.Message}");
    }
      }
     

    }


}
