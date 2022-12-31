using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models
{
    public class FavoriModel
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public int VoitureId { get; set; }
    }
}
