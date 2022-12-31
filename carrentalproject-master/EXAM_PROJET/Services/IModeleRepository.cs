using EXAM_PROJET.Models;

namespace EXAM_PROJET.Services
{
    public interface IModeleRepository
    {
        public Task<ICollection<Modele>> GetAllModele();
        public Task<Modele> GetModele(int id);
        public Task<Modele> AddModele(ModeleModel modeleModel);
        public Task<bool> DeleteModele(int id);
        public Task<bool> UpdateModele(ModeleModel modele, int id);

        public Task<ICollection<Modele>> getModeleLike(string? nom,int? id);
    }
}
