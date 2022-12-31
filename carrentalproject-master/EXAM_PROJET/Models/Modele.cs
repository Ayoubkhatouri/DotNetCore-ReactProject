using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models
{
    public class Modele
    {
        [Key]
        public int ModeleId { get; set; }
        [Required(ErrorMessage = "Provide Model")]
        public string NomModel { get; set; }
        public virtual ICollection<Voiture> Voitures { get; set; }
        public Marque Marque { get; set; }
        public int MarqueId { get; set; }
    }
}
