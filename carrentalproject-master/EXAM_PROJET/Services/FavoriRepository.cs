using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Services
{
    public class FavoriRepository : IFavoriRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVoitureRepository _voitureRepository;
        private readonly ApplicationDbContext _context;
        public FavoriRepository(UserManager<ApplicationUser> userManager, IVoitureRepository voitureRepository ,ApplicationDbContext context)
        {
            _userManager = userManager;
            _voitureRepository = voitureRepository;
            _context = context;
             
        }

        public    async Task<Favori> AddVoitureToFavori(int voitureId, string userId)
        {
             
            
            Favori modele = new Favori()
            {
                VoitureId = voitureId,
                UserId = userId
            };
            _context.Add(modele);
            await _context.SaveChangesAsync();
            return modele;



        }

        public bool Exist(int voitureId, string userId)
        {
              Favori v = _context.Favoris.Where(f => f.VoitureId == voitureId && f.UserId==userId).FirstOrDefault();
            if (v is null) return false;
            return true;
        }

        public  async Task<ICollection<Favori>> getFavoris()
        {
            return await _context.Favoris.ToListAsync();
        }

        public int GetnumberFavoris(int voitureId)
        {
            int number = _context.Favoris.Where(f => f.VoitureId == voitureId).Count();
            return number;
        }

        public async Task<List<Voiture>> getVoitureByUserId(string id)
        {
            List<int> listnuber = await _context.Favoris.Where(f => f.UserId == id).Select(ff => ff.VoitureId).ToListAsync();
            List<Voiture> mylist = new List<Voiture>();
            foreach( var i in listnuber)
            {
                mylist.Add(await _voitureRepository.GetVoitureById(i));
            } 
            return mylist.ToList();
          }

        public  async Task<bool> removeFromAllFavori(int voitureId)
        {
            var v = await _context.Favoris.Where(f => f.VoitureId == voitureId ).ToListAsync();
            foreach (var l in v)
            {
                _context.Favoris.Remove(l);
                await _context.SaveChangesAsync();

            }

            return true;
        }

        public async  Task<bool> removeFromFavori(int id, string userId)
        {
            Favori v = await _context.Favoris.Where(f => f.VoitureId == id && f.UserId == userId).FirstOrDefaultAsync();
            if (v is null) return false;
            _context.Favoris.Remove(v);
            await _context.SaveChangesAsync();
            return true;

        }

    }
}
