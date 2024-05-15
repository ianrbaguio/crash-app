using Crash.Models;
using Crash.Models.Entities;
using Crash.Models.Dtos;
namespace Crash.Repositories.IRepositories
{
    public interface IAccidentRepository
    {

        public Task<List<Accident>> GetAccidentListAsync();
<<<<<<< HEAD
        public Task<List<Accident>> GetAccidentListByRegionAsync(double North, double South, double East, double West);
=======
>>>>>>> b37bd723427a12c3ee36a1b9457cea2e3b700c5d
        public Task<Accident?> GetAccidentByIdAsync(Guid Id);
        public Task<Accident> AddAccidentAsync(Accident accident);

        public Task AddAccidentImagesAsync(List<IFormFile> Images, Guid Id);
        public Task<int> UpdateAccidentAsync(Accident accident);
        public Task<int> DeleteAccidentAsync(Guid Id);

    }
}
