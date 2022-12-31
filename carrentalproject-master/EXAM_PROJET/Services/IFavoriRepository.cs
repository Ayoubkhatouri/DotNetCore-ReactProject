using EXAM_PROJET.Models;

namespace EXAM_PROJET.Services
{
    public interface IFavoriRepository
    {
        public Task<List<Voiture>> getVoitureByUserId(string userid);    
        public Task<ICollection<Favori>> getFavoris();
        public Task<bool> removeFromFavori(int id, string userId);
        public Task<bool> removeFromAllFavori(int voitureId);
        public Task<Favori> AddVoitureToFavori(int voitureId, string userId);
        public int GetnumberFavoris(int voitureId);
        public bool Exist(int voitureId, string userId);

    }
}
