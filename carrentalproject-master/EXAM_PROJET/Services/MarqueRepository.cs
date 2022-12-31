using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Serialization;

namespace EXAM_PROJET.Services
{
    public class MarqueRepository : IMarqueRepository
    {
        private readonly  ApplicationDbContext _context;

        public MarqueRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<ICollection<Marque>> GetAllMarque()
        {
            return await _context.Marques.ToListAsync();
        }

        public async Task<Marque?> GetMarque(int id)
        {
            return await _context.Marques.FirstOrDefaultAsync(m => m.MarqueId == id);
        }

        public async Task<ICollection<Marque>> getMarqueLike(string nom)
        {
            IQueryable<Marque> marques = _context.Marques;
            if (!string.IsNullOrEmpty(nom))
            {
                marques = marques.Where(e=>e.NomMarque.Contains(nom));
            }
            return await marques.ToListAsync();
           
        }


        public async Task<Marque> AddMarque(MarqueModel marqueModel)
        {
            Marque marque = new Marque() { NomMarque = marqueModel.NomMarque };
              _context.Add(marque);
            await _context.SaveChangesAsync();
            return marque;
        }
        public async Task<bool> UpdateMarque(MarqueModel marque, int id)
        {
            var m = _context.Marques.Where(e => e.MarqueId == id).FirstOrDefault();
            
             m.NomMarque = marque.NomMarque;
            await  _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeleteMarque(int id)
        {
            var marque =  await _context.Marques.FindAsync(id);
            if (marque is null) return false;
              _context.Marques.Remove(marque);
             await _context.SaveChangesAsync();
            return true;


        }

       

       

       

        
    }
}
