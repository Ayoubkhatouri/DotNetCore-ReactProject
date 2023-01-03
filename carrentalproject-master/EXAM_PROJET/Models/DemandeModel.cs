using EXAM_PROJET.Models.User;

namespace EXAM_PROJET.Models
{
    public class DemandeModel
    {
        public int? Id { get; set; }
        public string locataireId { get; set; }
        public int VoitureId { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public Double PrixTotal { get; set; }
        public string statut { get; set; }
        public Voiture Voiture { get; set; }
        public ApplicationUser? Locataire {get; set;}

        public DemandeModel(Demande demand) 
        {
            this.Id = demand.Id;
                this.DateFin= demand.DateFin;
            this.DateDebut = demand.DateDebut;
            this.statut = demand.statut;
            this.PrixTotal = demand.PrixTotal;
            this.VoitureId = demand.VoitureId;
            this.locataireId = demand.locataireId;
        }
        public DemandeModel()
        {

        }
    }
}
