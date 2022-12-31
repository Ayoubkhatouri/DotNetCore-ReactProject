using EXAM_PROJET.Models.User;
using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models
{
    public class Favori
    {
        [Key]
         public int Id { get; set; }    
        public string UserId { get; set; }  
       
        public int VoitureId { get; set; }
    }
}
