using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models.User
{
    public class RegisterModel
    {
        [Required]
       public string Nom { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Prenom { get; set; }
        [Required]
        public string Telephone { get; set; }
        [Required]
        public string Ville { get; set; }
        [Required]
        public string Adresse { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public bool isAgence { get; set; }
    }
}
