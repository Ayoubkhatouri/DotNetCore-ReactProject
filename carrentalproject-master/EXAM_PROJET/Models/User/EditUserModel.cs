using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models.User
{
    public class EditUserModel
    {

        [Required]
        public string Nom { get; set; }
       
        [Required]
        public string Prenom { get; set; }
        [Required]
        public string Telephone { get; set; }
        [Required]
        public string Ville { get; set; }
        [Required]
        public string Adresse { get; set; }
         
        [Required]
        public bool isAgence { get; set; }
    }
}
