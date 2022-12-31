using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models
{
    public class Marque
    {
        [Key]
        public int MarqueId { get; set; }
       
        public string NomMarque { get; set; }
        public virtual ICollection<Voiture> Voitures { get; set; }
        public virtual ICollection<Modele> Modeles { get; set; }    
    }
}
