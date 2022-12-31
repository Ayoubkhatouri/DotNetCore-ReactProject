using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using EXAM_PROJET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandeController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDemandeRepository _demandeRepository;
        private readonly IVoitureRepository _voitureRepository;
        public DemandeController(UserManager<ApplicationUser> userManager, IDemandeRepository demandeRepository, IVoitureRepository voitureRepository)
        {
            _userManager = userManager;
            _demandeRepository = demandeRepository;
            _voitureRepository = voitureRepository;
        }

        [Authorize(Roles = "Admin,Locataire,Proprietaire")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var modele = await _demandeRepository.getAll();
            return Ok(modele);
        }
        [HttpGet("locataire/{id}")]
        public async Task<IActionResult> Getl(string id)
        {
            var product = await _demandeRepository.getByLocataireId(id);

            return Ok(product);

        }

        [Authorize(Roles = "Admin,Proprietaire")]

        [HttpGet("proprietaire/{id}")]
        public async Task<IActionResult> GetProprietaire(string id)
        {
            var product = await _demandeRepository.getByProprietaireId(id);

            return Ok(product);

        }
     



        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DemandeModel2 model)
        {

            if (await _userManager.FindByIdAsync(model.locataireId) is null)
                return BadRequest("id user n'exist pas ");

            if (await _voitureRepository.GetVoitureById(model.VoitureId) is null)
            {
                return BadRequest("id voiture n'exist pas ");

            }
            DemandeModel mo = new DemandeModel()
            {
                VoitureId = model.VoitureId,
                DateDebut = model.DateDebut,
                DateFin = model.DateFin,
                statut = model.statut,
                locataireId = model.locataireId,
                PrixTotal = model.PrixTotal,
                
            };
            var dem = await _demandeRepository.sendDemande(mo);
            if (dem is null)
            {
                return BadRequest("something went wrong");
            }
            return Ok(dem);
             
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] DemandeModel2 model)
        {

            if (await _userManager.FindByIdAsync(model.locataireId) is null)
                return BadRequest("id user n'exist pas ");

            if (await _voitureRepository.GetVoitureById(model.VoitureId) is null)
            {
                return BadRequest("id voiture n'exist pas ");

            }
            if(model.Id is null)
            {
                return BadRequest("id demande non envoyee");
            }
            DemandeModel mo = new DemandeModel()
            { 
                Id=model.Id,
                VoitureId = model.VoitureId,
                DateDebut = model.DateDebut,
                DateFin = model.DateFin,
                statut = model.statut,
                locataireId = model.locataireId,
                PrixTotal = model.PrixTotal,

            };
            var dem = await _demandeRepository.updateDemande(mo);
            if (dem is null)
            {
                return BadRequest("something went wrong");
            }
            return Ok(dem);
            
        }
    }
}
