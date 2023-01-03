using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using EXAM_PROJET.Services;
using EXAM_PROJET.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoitureController:ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _environment;
        private readonly IVoitureRepository _voitureRepository;
   
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDemandeRepository _dem;
        private readonly IFavoriRepository _fav;
        private readonly IOffreRepository _off;
        public VoitureController(ApplicationDbContext context,UserManager<ApplicationUser> userManager,IHostingEnvironment environment,IVoitureRepository voitureRepository,IOffreRepository off,IDemandeRepository dem,IFavoriRepository fav)
        {
            _context = context;
                 
                    _userManager = userManager;
            _environment = environment;
            _voitureRepository = voitureRepository;
            _off = off;
            _dem = dem;
            _fav = fav;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var marque = await _context.Voitures.ToListAsync();
            return Ok(marque);
        }
        [HttpGet("valid")]
        public async Task<IActionResult> GetValid()
        {
            var marque = await _voitureRepository.GetVoitureNonBlacklisted();
            return Ok(marque);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _context.Voitures.FindAsync(id);
            if (product == null)
                return BadRequest("voiture id n'exist pas ");
            return Ok(product);

        }
        [HttpGet("user/{id}")]

        public async Task<IActionResult> getByUserId(string id)
        {
            var product = await _voitureRepository.GetVoitureByUserId(id);
            return Ok(product);
        }





        [Authorize(Roles = "Admin,Proprietaire")]

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] VoitureModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var p = await _voitureRepository.GetVoitureById(id);
            if (p == null) return BadRequest("id voiture n'exist pas");

            var product = await _context.Marques.FirstOrDefaultAsync(m => m.MarqueId == model.MarqueId);
            if (product == null)
                return BadRequest("id marque n'exist pas");

            var Modele = await _context.Modeles.FirstOrDefaultAsync(m => m.ModeleId == model.ModeleId);
            if (product == null)
                return BadRequest("id modele n'exist pas");

            var mymodele = await _context.Modeles.FirstOrDefaultAsync(m => m.ModeleId == model.ModeleId);
            string pathImage = String.Empty;
            var voiture = await _voitureRepository.GetVoitureById(id);

            System.IO.File.Delete(voiture.ImagePath);

            var help = model.ImagePath;

            help = help.Substring(37, model.ImagePath.Length - 37);

            System.IO.File.Copy(model.ImagePath, "C:\\Users\\admin\\OneDrive\\Desktop\\test2\\frontend\\public\\images\\" + help);

            p.Annee = model.Annee;
            p.PrixParJour = model.PrixParJour;
            p.Kilometrage = model.Kilometrage;
            p.MarqueId = model.MarqueId;
            p.Modele = mymodele;
            p.Couleur = model.Couleur;
            p.Rating = model.Rating;
            p.ImagePath = "C:\\Users\\admin\\OneDrive\\Desktop\\test2\\frontend\\public\\images\\" + help;
            p.ProprietaireId = model.ProprietaireId;
            p.EstDisponible = model.EstDisponible;
            p.Immatriculation = model.Immatriculation;
            p.Description = model.Description;

            await _context.SaveChangesAsync();
            return Ok(p);





        }



        [Authorize(Roles = "Admin,Proprietaire")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VoitureModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            var product = await _context.Marques.FirstOrDefaultAsync(m => m.MarqueId == model.MarqueId);
            if (product == null)
                return BadRequest("id marque n'exist pas");

            var Modele = await _context.Modeles.FirstOrDefaultAsync(m => m.ModeleId == model.ModeleId);
            if (product == null)
                return BadRequest("id modele n'exist pas");

            var mymodele = await _context.Modeles.FirstOrDefaultAsync(m => m.ModeleId == model.ModeleId);

            if (await _userManager.FindByIdAsync(model.ProprietaireId) is null)
                return BadRequest("id user n'exist pas ");
            ApplicationUser myprop = await _userManager.FindByIdAsync(model.ProprietaireId);
            var help = model.ImagePath;

            help = help.Substring(37, model.ImagePath.Length - 37);

            System.IO.File.Copy(model.ImagePath, "C:\\Users\\admin\\OneDrive\\Desktop\\test2\\frontend\\public\\images\\" + help);

            Voiture m = new Voiture()
            {
                Annee = model.Annee,
                PrixParJour = model.PrixParJour,
                Kilometrage = model.Kilometrage,
                MarqueId = model.MarqueId,
                Modele = mymodele,
                Couleur = model.Couleur,
                Rating = model.Rating,
                ImagePath = "C:\\Users\\admin\\OneDrive\\Desktop\\test2\\frontend\\public\\images\\" + help,
                ProprietaireId = model.ProprietaireId,
                EstDisponible = model.EstDisponible,
                Immatriculation = model.Immatriculation,
                Description = model.Description

            };

            _context.Add(m);
            await _context.SaveChangesAsync();
            return Ok(m);
        }

        [Authorize(Roles = "Admin,Proprietaire")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
          

            var modele = await _context.Voitures.FindAsync(id);
            if (modele is null) return BadRequest("id voiture n'exist pas ");
            await _off.removeVoiture(id);
            await _fav.removeFromAllFavori(id);
            await _dem.deleteDemandeByVoitureId(id);
            System.IO.File.Delete(modele.ImagePath);
            _context.Voitures.Remove(modele);
            await _context.SaveChangesAsync();

            return Ok(true);
        }






    }
}
