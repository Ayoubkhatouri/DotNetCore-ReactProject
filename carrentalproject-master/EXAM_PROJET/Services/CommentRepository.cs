using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Models.Comment;
using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Services
{
    public class CommentRepository : ICommentRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVoitureRepository _voitureRepository;
        private readonly ApplicationDbContext _context;
        public CommentRepository(UserManager<ApplicationUser> userManager, IVoitureRepository voitureRepository, ApplicationDbContext context)
        {
            _userManager = userManager;
            _voitureRepository = voitureRepository;
            _context = context;
        }


        public  async Task<CommentGet> addCommentByVoitureId(CommentModel model)
        {
            Comment co = new Comment() {
                UserId = model.UserId,
                VoitureId=model.VoitureId,
                comment = model.comment
            };
            _context.Add(co);
            await _context.SaveChangesAsync();
            CommentGet cog = new CommentGet() {
                Id = co.Id,
                UserId = co.UserId,
                VoitureId = co.VoitureId,
                comment = co.comment,
                nomUser = await this.getNom(model.UserId)
            };

            return cog;

        }

        public  async Task<List<CommentGet>> getCommentByVoitureId(int VoitureId)
        {
            List<Comment> list = await _context.Comments.ToListAsync();
            List<CommentGet> mylist = new List<CommentGet>();
            foreach (var co in list)
            {
                if (co.VoitureId == VoitureId)
                {
                    CommentGet v = new CommentGet()
                    {
                        Id = co.Id,
                        UserId = co.UserId,
                        VoitureId = co.VoitureId,
                        comment = co.comment,
                        nomUser = await this.getNom(co.UserId)
                    };
                    mylist.Add(v);
                }
              
                  
            }
            return mylist;
        }

        public async  Task<bool> removeComment(int id)
        {
          var co = await _context.Comments.Where(co=> co.Id==id).FirstOrDefaultAsync();
            if (co == null) { return false; }
            _context.Comments.Remove(co);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<string> getNom(string userId)
        {
            var u = await _userManager.FindByIdAsync(userId);
            string nomcomplet = u.Nom + " " + u.Prenom;
            return nomcomplet;
        }
         
    }
}
