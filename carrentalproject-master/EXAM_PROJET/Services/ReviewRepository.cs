using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Models.Reviews;
using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Services
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVoitureRepository _voitureRepository;
        private readonly ApplicationDbContext _context;
        public ReviewRepository(UserManager<ApplicationUser> userManager, IVoitureRepository voitureRepository, ApplicationDbContext context)
        {
            _userManager = userManager;
            _voitureRepository = voitureRepository;
            _context = context;
        }

        public async Task<int> CreateReview(ReviewModel model)
        {
            var review = new Review() { 
             UserId =model.UserId,
             VoitureId=model.VoitureId,
             rating=model.rating
            };
            _context.Add(review);
            await _context.SaveChangesAsync();
            int t =  await this.GetReview(model.VoitureId);
            Voiture v = await  _context.Voitures.FindAsync(model.VoitureId);
            v.Rating = t;
            await _context.SaveChangesAsync();
            return t;

        }

        public async Task<List<Review>> GetAll()
        {
          var list = await   _context.Reviews.ToListAsync();
            return list;
        }

        public async  Task<int> GetNombreReview(int voitureId)
        {
            var list = await _context.Reviews.Where(re => re.VoitureId == voitureId).ToListAsync();
            return list.Count();
        }

        public async Task<int> GetReview(int voitureId)
        {
            var list = await _context.Reviews.Where(re => re.VoitureId == voitureId).ToListAsync();
            int i = 0;
            int somme = 0;
            foreach (var v in list)
            {
                i++;
                somme += v.rating;

            }
            double r = somme / i;
            int result = (int)Math.Round(r);
            return result; 
        }

        public async Task<bool> ReviewExist(int voitureId, string userId)
        {
            var e =await  _context.Reviews.Where(r => r.VoitureId == voitureId && r.UserId == userId).FirstOrDefaultAsync();
            if (e is null) return false;
            else return true;
        }

        public  async Task<int> updateReview(ReviewModel model)
        {
             var elem = await  _context.Reviews
                .Where(r => r.VoitureId == model.VoitureId && r.UserId == model.UserId)
                .FirstOrDefaultAsync();
            elem.rating = model.rating;
            await _context.SaveChangesAsync();
            int t = await this.GetReview(model.VoitureId);
            Voiture v = await _context.Voitures.FindAsync(model.VoitureId);
            v.Rating = t;
            await _context.SaveChangesAsync();
            return t;

        }
    }
}
