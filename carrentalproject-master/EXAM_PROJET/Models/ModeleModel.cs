using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models
{
    public class ModeleModel
    {
        [Required]
        public int MarqueId { get; set; }
        [Required]
        public string NomModel { get; set; }
    }
}
