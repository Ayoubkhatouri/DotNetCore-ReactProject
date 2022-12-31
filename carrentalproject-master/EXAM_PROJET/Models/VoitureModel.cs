using EXAM_PROJET.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace EXAM_PROJET.Models
{
    public class VoitureModel
    {
        [Required]
        public double PrixParJour { get; set; }

        [Required(ErrorMessage = "Provide Year")]
        public string Annee { get; set; }

        [Required(ErrorMessage = "Provide Mileage")]
   
        public string Kilometrage { get; set; }



        [Required]
        public int MarqueId { get; set; }
        [Required]
        public int ModeleId { get; set; }


        
        public string? Couleur { get; set; }

        public int Rating { get; set; }

        public string Immatriculation { get; set; }
        [DefaultValue("Description")]
        public string Description { get; set; }
       

        public string? ImagePath { get; set; }

        public string ProprietaireId { get; set; }

        public bool EstDisponible { get; set; }
    }
}
