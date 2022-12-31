using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Services
{
    public class ModeleRepository : IModeleRepository
    {
        private readonly ApplicationDbContext _context;
        public ModeleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async  Task<Modele> AddModele(ModeleModel modeleModel)
        {
            Modele modele = new  Modele() {  NomModel = modeleModel.NomModel,
            MarqueId=modeleModel.MarqueId};
            _context.Add(modele);
            await _context.SaveChangesAsync();
            return modele;
        }

        public async  Task<bool> DeleteModele(int id)
        {

            var modele = await _context.Modeles.FindAsync(id);
            if (modele is null) return false;
            _context.Modeles.Remove(modele);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ICollection<Modele>> GetAllModele()
        {
            return await _context.Modeles.ToListAsync();
        }

        public async Task<Modele> GetModele(int id)
        {
            return await _context.Modeles.FirstOrDefaultAsync(m => m.ModeleId == id);
        }

        public async Task<ICollection<Modele>> getModeleLike(string? nom, int? id)
        {
            IQueryable<Modele> modeles = _context.Modeles;
            if(!string.IsNullOrEmpty(nom))
            {
                modeles = modeles.Where(m => m.NomModel.Contains(nom));
            }
            if(id != null)
            {
                modeles = modeles.Where(mo => mo.MarqueId == id);
            }
            return await modeles.ToListAsync();
        }

        public async Task<bool> UpdateModele(ModeleModel modele, int id)
        {
            var m = _context.Modeles.Where(e => e.ModeleId == id).FirstOrDefault();

            m.NomModel = modele.NomModel;
            m.MarqueId = modele.MarqueId;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
