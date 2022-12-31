using EXAM_PROJET.Models;

namespace EXAM_PROJET.Services
{
    public interface IMarqueRepository
    {
        public Task<ICollection<Marque>> GetAllMarque();
        public Task<Marque> GetMarque(int id);
        public Task<Marque> AddMarque(MarqueModel marqueModel);
        public Task<bool> DeleteMarque(int id);   
        public Task<bool> UpdateMarque(MarqueModel marque,int id);

        public  Task<ICollection<Marque>> getMarqueLike(string nom);
    }
}
