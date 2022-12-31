using System.ComponentModel.DataAnnotations;

namespace EXAM_PROJET.Models.User
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
