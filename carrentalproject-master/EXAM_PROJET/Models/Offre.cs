using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models
{
    public class Offre
    {
        [Key]
        public int Id { get; set; }
        public int voitureId { get; set; }
        public double montant { get; set; }
    }
}
