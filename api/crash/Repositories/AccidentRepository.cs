using Microsoft.EntityFrameworkCore;
using System;
using System.Numerics;
using Crash.Models;
using Crash.Database;
using Crash.Models.Entities;
using Crash.Models.Dtos;
using Crash.Repositories.IRepositories;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;

using System.Collections.Generic;
using OpenCvSharp;
using System.Drawing;
using Image = Crash.Models.Entities.Image;


namespace Crash.Repositories
{
   public class AccidentRepository : IAccidentRepository
   {
      private readonly AppDbContext _dbContext;

      public AccidentRepository(AppDbContext dbContext)
      {
         _dbContext = dbContext;
      }
      public async Task<Accident?> GetAccidentByIdAsync(Guid Id)
      {

         var accident = await _dbContext.accident.FirstOrDefaultAsync(e => e.Id == Id);

         var parties = await _dbContext.party_details.Where(e => e.AccidentId == Id).ToListAsync();

         if (accident == null)
            throw new Exception("Accident is not found.");
         else
            return accident;

      }

      public async Task AddAccidentImagesAsync(List<IFormFile> Images, Guid Id)
      {

         var accident = await _dbContext.accident.FirstOrDefaultAsync(e => e.Id == Id);
         if (accident != null)
            foreach (var img in Images)
            {

               using (var memoryStream = new MemoryStream())
               {
                  await img.CopyToAsync(memoryStream);
                  var imageData = memoryStream.ToArray();

                  var imageEntity = new Image()
                  {

                     ImageData = imageData,
                     AccidentId = Id// Assign the accident's Id as the foreign key

                  };

                  _dbContext.image.Add(imageEntity);
                  await _dbContext.SaveChangesAsync();

               }

            }
         else
         {
            throw new Exception("Accident does not exist");
         }

      }
      public async Task<Accident> AddAccidentAsync(Accident accident, Party[] parties)
      {
         var result = _dbContext.accident.Add(accident);

         if (result != null && parties.Length > 0)
         {
            foreach (var party in parties)
            {
               party.AccidentId = result.Entity.Id;

               _dbContext.party_details.Add(party);
            }

            // Add party details to the postgres table
            await _dbContext.SaveChangesAsync();

         }

         return result.Entity;

      }

      public async Task<int> DeleteAccidentAsync(Guid Id)
      {
         var filteredData = _dbContext.accident.Where(x => x.Id == Id).FirstOrDefault();
         if (filteredData != null)
            _dbContext.accident.Remove(filteredData);
         return await _dbContext.SaveChangesAsync();
      }

      public async Task<List<Accident>> GetAccidentListAsync()
      {

         var accidents = await _dbContext.accident.ToListAsync();

         return accidents;
      }

      public Task<List<Accident>> GetAccidentListByRegionAsync(double North, double South, double East, double West)

      {
         var accidents = _dbContext.accident.Where(a =>
                 (a.Latitude >= South && a.Latitude <= North) &&
                 (a.Longitude >= West && a.Longitude <= East)).ToListAsync();

         return accidents;

      }


      public async Task<int> UpdateAccidentAsync(Accident accident)
      {
         _dbContext.accident.Update(accident);
         return await _dbContext.SaveChangesAsync();
      }

      public Task<List<Image>> GetImagesByAccidentIdAsync(Guid accidentId)
      {

         var images = _dbContext.image.Where(a =>
                 (a.AccidentId == accidentId)).ToListAsync();
         return images;

      }

        public Task<List<Party>> GetAccidentPartiesAsync(Guid accidentId)
        {

            var parties = _dbContext.party_details.Where(a =>
                    (a.AccidentId == accidentId)).ToListAsync();
            return parties;

        }

        public async Task<byte[]> MergeAccidentImagesAsync(List<IFormFile> streetViewImages, List<IFormFile> accidentImages)
        {
            List<Mat> streetViewMats = new List<Mat>();
            List<Mat> accidentMats = new List<Mat>();

            foreach (var img in streetViewImages)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await img.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    var mat = Mat.FromImageData(imageData, ImreadModes.Color);
                    streetViewMats.Add(mat);
                }
            }

            foreach (var img in accidentImages)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await img.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    var mat = Mat.FromImageData(imageData, ImreadModes.Color);
                    accidentMats.Add(mat);
                }
            }

            // Assuming the first image in each list is the primary image to merge
            Mat streetViewImage = streetViewMats.First();
            Mat accidentImage = accidentMats.First();

            // Resize accident image to match street view image size
            Cv2.Resize(accidentImage, accidentImage, new OpenCvSharp.Size(streetViewImage.Width, streetViewImage.Height));

            // Merge images (simple overlay for demonstration purposes)
            Mat mergedImage = new Mat();
            Cv2.AddWeighted(streetViewImage, 0.5, accidentImage, 0.5, 0, mergedImage);

            // Convert merged image to byte array
            byte[] mergedImageData;
            using (var ms = new MemoryStream())
            {
#if WINDOWS
                Bitmap bitmap = OpenCvSharp.Extensions.BitmapConverter.ToBitmap(mergedImage);
                bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
#else
                mergedImageData = mergedImage.ToBytes(".png");
                ms.Write(mergedImageData, 0, mergedImageData.Length);
#endif
                mergedImageData = ms.ToArray();
            }

            return mergedImageData;
        }

    }

}
