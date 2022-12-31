using EXAM_PROJET.Models;

namespace EXAM_PROJET.Services
{
    public interface IOffreRepository
    {

        public Task<List<OffreVoitureModel>> GetVoitures();
        public Task<bool> exist(int voitureId ); 
        public Task<Offre> AddVoiture(int voitureId, double montant);
        public Task<bool> removeVoiture(int voitureId);
        public Task<Offre> updateOffre(int voitureId, double montant);


    }
}
