namespace EXAM_PROJET.Models
{
    public class DemandeModel2
    {
        public int? Id { get; set; }
        public string locataireId { get; set; }
        public int VoitureId { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public Double PrixTotal { get; set; }
        public string statut { get; set; }
    }
}
