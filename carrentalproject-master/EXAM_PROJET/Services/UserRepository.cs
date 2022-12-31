using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Services
{
    public class UserRepository : IUserRepository
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<ICollection<ApplicationUser>> GetAllUser()
        {
            return await  _userManager.Users.ToListAsync();
        }

        public async Task<ApplicationUser> GetById(string id)
        {
            var user = await  _userManager.FindByIdAsync(id);
            
            return user;
        }

        public async Task<ICollection<ApplicationUser>> GetByNameOrRole(string? role,string? name)
        {
           
            List<ApplicationUser> usersrole;
            
            if (!string.IsNullOrEmpty(role))
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    return new List<ApplicationUser>();
                }
                usersrole = (List<ApplicationUser>)await _userManager.GetUsersInRoleAsync(role);

            }
            else
            {
                usersrole = await _userManager.Users.ToListAsync();
            }
           
            if (!String.IsNullOrEmpty(name))
            {
                var u = usersrole.Where(u => u.Nom.Contains(name) || u.Prenom.Contains(name)).ToList();
                // users = usersrole.Where(u => u.Nom.Contains(name) || u.Prenom.Contains(name));
                return u;
            }
           return usersrole;
            
        }

        public async  Task<bool> UpdateUser(EditUserModel model ,string id)
        {
            var u = await _userManager.FindByIdAsync(id);
            u.Nom=model.Nom;
            u.Prenom = model.Prenom;
            u.Adresse = model.Adresse;
            u.PhoneNumber = model.Telephone;
            u.Ville = model.Ville;
            u.isAgence = model.isAgence;
            await _userManager.UpdateAsync(u);
            return true;

           
        }
    }
}
