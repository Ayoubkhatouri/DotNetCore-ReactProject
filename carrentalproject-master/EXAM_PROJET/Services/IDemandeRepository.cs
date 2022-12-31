using EXAM_PROJET.Models;

namespace EXAM_PROJET.Services
{
    public interface IDemandeRepository
    {
        public Task<List<DemandeModel>> getAll();
        public Task<List<DemandeModel>> getByLocataireId(string locataireId);
        public Task<List<DemandeModel>> getByProprietaireId(string proprietaireId);
        public Task<DemandeModel> sendDemande(DemandeModel model);
        public  Task<DemandeModel> updateDemande(DemandeModel demande );
        public  Task<bool> deleteDemandeByVoitureId(int voitureId); 

    }
}
