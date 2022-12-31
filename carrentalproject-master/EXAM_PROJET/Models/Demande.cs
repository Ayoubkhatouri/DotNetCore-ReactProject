using EXAM_PROJET.Models.User;
using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models
{
    public class Demande
    {
        [Key]
        public int  Id { get; set; }
        public string locataireId { get; set; }
       
        public Voiture Voiture { get; set; }
        public int VoitureId { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public Double PrixTotal { get; set;}
        public string statut { get; set; }

    }
}
