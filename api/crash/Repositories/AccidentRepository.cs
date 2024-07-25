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
 

namespace Crash.Repositories
{
    public class AccidentRepository : IAccidentRepository
    {
        private readonly AppDbContext _dbContext;

        public AccidentRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public  async Task<Accident?>  GetAccidentByIdAsync(Guid Id)
        {
        
            var accident= await _dbContext.accident.FirstOrDefaultAsync(e => e.Id == Id);

            if (accident == null)
                throw new Exception("Accident is not found." );
            else
                return accident;

        }

        public async Task AddAccidentImagesAsync(List<IFormFile> Images, Guid Id)
        {

            var accident = await _dbContext.accident.FirstOrDefaultAsync(e => e.Id == Id);
            if (accident!=null)
                foreach (var img in Images)
                {

                    using (var memoryStream = new MemoryStream())
                    {
                        await img.CopyToAsync(memoryStream);
                        var imageData = memoryStream.ToArray();

                        var imageEntity = new Image()
                        {

                                 ImageData = imageData,
                                 AccidentId =Id// Assign the accident's Id as the foreign key

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
            public async Task<Accident> AddAccidentAsync(Accident accident)
        {
            var result = _dbContext.accident.Add(accident);     
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<int> DeleteAccidentAsync(Guid Id)
        {
            var filteredData = _dbContext.accident.Where(x => x.Id == Id).FirstOrDefault();
           if (filteredData!=null)
             _dbContext.accident.Remove(filteredData);
            return await _dbContext.SaveChangesAsync();
        }
 
        public async Task<List<Accident>> GetAccidentListAsync()
        {
            return await _dbContext.accident.ToListAsync();
        }
 
        public Task<List<Accident>> GetAccidentListByRegionAsync(double North, double South, double East, double West)

        {
            var accidents = _dbContext.accident.Where(a =>
                    (a.Latitude>= South && a.Latitude<=North) &&
                    (a.Longitude>=West && a.Longitude<=East)).ToListAsync();

            return accidents;

        }
 
 
        public async Task<int> UpdateAccidentAsync(Accident accident)
        {
            _dbContext.accident.Update(accident);
            return await _dbContext.SaveChangesAsync();
        }

        public Task<List<Image>> GetImagesByAccidentIdAsync(Guid accidentId){

            var images = _dbContext.image.Where(a =>
                    (a.AccidentId== accidentId )).ToListAsync();
            return images;

        }
    }
}
