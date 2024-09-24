using Crash.Models;
using Crash.Models.Entities;
using Crash.Models.Dtos;
namespace Crash.Repositories.IRepositories
{
    public interface IAccidentRepository
    {

        public Task<List<Accident>> GetAccidentListAsync();
 
        public Task<List<Accident>> GetAccidentListByRegionAsync(double North, double South, double East, double West);
 
        public Task<Accident?> GetAccidentByIdAsync(Guid Id);
        public Task<Accident> AddAccidentAsync(Accident accident, Party[] parties);

        public Task AddAccidentImagesAsync(List<IFormFile> Images, Guid Id);
        public Task<int> UpdateAccidentAsync(Accident accident);
        public Task<int> DeleteAccidentAsync(Guid Id);

        public Task<List<Image>> GetImagesByAccidentIdAsync(Guid accidentId);
        public Task<List<Party>>  GetAccidentPartiesAsync(Guid accidentId);

    }
}
