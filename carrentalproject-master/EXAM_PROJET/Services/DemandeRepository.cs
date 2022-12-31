using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Services
{
    public class DemandeRepository : IDemandeRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVoitureRepository _voitureRepository;
        private readonly ApplicationDbContext _context;
        public DemandeRepository(UserManager<ApplicationUser> userManager, IVoitureRepository voitureRepository, ApplicationDbContext context)
        {
            _userManager = userManager;
            _voitureRepository = voitureRepository;
            _context = context;
        }

        public async Task<bool> deleteDemandeByVoitureId(int voitureId)
        {
            var listDemande = await _context.Demandes.Where(e => e.VoitureId == voitureId).ToListAsync();
            foreach(var l in listDemande)
            {
                _context.Demandes.Remove(l);
                await _context.SaveChangesAsync();

            }
          
           return   true;
        }

        public  async Task<List<DemandeModel>> getAll()
        {
            List<Demande> list = await  _context.Demandes.ToListAsync();
            List<DemandeModel> mylist = new List<DemandeModel>();
            foreach( var l in list)
            {
                mylist.Add(new DemandeModel(l));
            }
            return mylist;
        }

        public  async Task<List<DemandeModel>> getByLocataireId(string locataireId)
        {
            List<Demande> list = await _context.Demandes.ToListAsync();
            List<DemandeModel> mylist = new List<DemandeModel>();
            foreach (var l in list)
            {
                if(l.locataireId==locataireId)
                mylist.Add(new DemandeModel(l));
            }
            return mylist;
        }

        public  async Task<List<DemandeModel>> getByProprietaireId(string proprietaireId)
        {
            List<Demande> list = await _context.Demandes.ToListAsync();
            List<DemandeModel> mylist = new List<DemandeModel>();
            foreach (var l in list)
            {
                Voiture v =  await _voitureRepository.GetVoitureById(l.VoitureId);
                if (v.ProprietaireId == proprietaireId)
                    mylist.Add(new DemandeModel(l));
            }
            return mylist;
        }

        public async  Task<DemandeModel> sendDemande(DemandeModel model)
        {
            Voiture v = await _voitureRepository.GetVoitureById(model.VoitureId);
            Demande demande = new Demande()
            {
                Voiture = v,
                VoitureId = model.VoitureId,
                DateDebut = model.DateDebut,
                DateFin = model.DateFin,
                statut = model.statut,
                locataireId = model.locataireId,
                PrixTotal = model.PrixTotal
            };
            _context.Add(demande);
            await _context.SaveChangesAsync();
            return new DemandeModel(demande);



        }

        public  async Task<DemandeModel> updateDemande(DemandeModel demande )
        {
            var d = await  _context.Demandes.FindAsync(demande.Id);
            d.statut = demande.statut;
            await _context.SaveChangesAsync();
            return new DemandeModel(d);
        }
    }
}
