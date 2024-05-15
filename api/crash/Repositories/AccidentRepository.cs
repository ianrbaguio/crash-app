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
<<<<<<< HEAD
using System.Collections.Generic;
=======
>>>>>>> b37bd723427a12c3ee36a1b9457cea2e3b700c5d

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
<<<<<<< HEAD
        public Task<List<Accident>> GetAccidentListByRegionAsync(double North, double South, double East, double West)

        {
            var accidents = _dbContext.accident.Where(a =>
                    (a.Latitude>= South && a.Latitude<=North) &&
                    (a.Longitude>=West && a.Longitude<=East)).ToListAsync();

            return accidents;

        }
 
=======

>>>>>>> b37bd723427a12c3ee36a1b9457cea2e3b700c5d
        public async Task<int> UpdateAccidentAsync(Accident accident)
        {
            _dbContext.accident.Update(accident);
            return await _dbContext.SaveChangesAsync();
        }
    }
}
