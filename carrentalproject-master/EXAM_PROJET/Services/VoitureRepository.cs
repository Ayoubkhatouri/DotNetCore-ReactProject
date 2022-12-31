using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Services
{
    public class VoitureRepository : IVoitureRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public VoitureRepository(ApplicationDbContext context ,UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
             _roleManager = roleManager;
        }
        public async Task<List<Voiture>> GetVoitureNonBlacklisted()
        {
           
            List<Voiture> listvoiturefilter = new List<Voiture>();
            List<Voiture> voiturelist = await  _context.Voitures.ToListAsync();

            foreach( var v in voiturelist)
            {
                ApplicationUser prop = await _userManager.FindByIdAsync(v.ProprietaireId);
                if (!await _userManager.IsInRoleAsync(prop, "blacklisted")){

                    listvoiturefilter.Add(v);
                }
            }
            return listvoiturefilter;
            
        }
      

        public Task<bool> DeleteVoiture(int id)
        {
            throw new NotImplementedException();
        }

        public async  Task<Voiture> GetVoitureById(int voitureId)
        {
            return await _context.Voitures.FirstOrDefaultAsync(m => m.VoitureId == voitureId);
        }

        public async Task<List<Voiture>> GetVoitureByUserId(string userId)
        {
            var query = await _context.Voitures.Where(v=>v.ProprietaireId == userId).ToListAsync();
            return query;
        }

         
    }
}
