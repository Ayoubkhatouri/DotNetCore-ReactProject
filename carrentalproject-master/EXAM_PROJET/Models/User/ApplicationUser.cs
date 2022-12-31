using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace EXAM_PROJET.Models.User
{
    public class ApplicationUser:IdentityUser
    {
        
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Adresse { get; set; }
        public string Ville { get; set; }
        public bool isAgence { get; set; }
      //  public virtual ICollection<Demande> Demandes { get; set; }
        public virtual ICollection<Voiture> Voitures { get; set; }
        [NotMapped]
        public bool IsAdmin { get; set; }
      

    }
}
