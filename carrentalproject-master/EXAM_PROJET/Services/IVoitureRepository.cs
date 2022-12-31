using EXAM_PROJET.Models;

namespace EXAM_PROJET.Services
{
    public interface IVoitureRepository
    {
        public Task<Voiture> GetVoitureById(int voitureId);
        public Task<List<Voiture>> GetVoitureByUserId(string userId);
        public Task<List<Voiture>> GetVoitureNonBlacklisted();
        public Task<bool> DeleteVoiture(int id);
        
    }
}
