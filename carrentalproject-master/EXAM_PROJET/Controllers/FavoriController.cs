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
    public class FavoriController:ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFavoriRepository _favoriRepository;
        private readonly IVoitureRepository _voitureRepository;

        public FavoriController(UserManager<ApplicationUser> userManager, IFavoriRepository favoriRepository, IVoitureRepository voitureRepository)
        {
            _userManager = userManager;
            _favoriRepository = favoriRepository;
            _voitureRepository = voitureRepository;
        }
        

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var modele = await _favoriRepository.getFavoris();
            return Ok(modele);
        }
        [Authorize(Roles = "Admin,Locataire,Proprietaire")]

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            if (await _userManager.FindByIdAsync(id ) is null)
                return BadRequest("id user n'exist pas ");
            var product = await _favoriRepository.getVoitureByUserId(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }
        [HttpGet("count/{idvoiture}")]
        public async Task<IActionResult> Getcount(int idvoiture)
        {
            if( await _voitureRepository.GetVoitureById(idvoiture) is null)
            {
                return BadRequest("id voiture n'exist pas ");

            }
            int  product =   _favoriRepository.GetnumberFavoris(idvoiture);
             
                 
            return Ok(product);
        }
        [Authorize(Roles = "Admin,Locataire,Proprietaire")]

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FavoriModel model)
        {
            if( await _userManager.FindByIdAsync(model.UserId) is null)
            {
                return BadRequest("id user not found");

            }
            if(await _voitureRepository.GetVoitureById(model.VoitureId) is null)
            {
                return BadRequest("id voiture not found");

            }
            if(_favoriRepository.Exist(model.VoitureId, model.UserId))
            {
                return BadRequest("voiture deja en favoris");
            }
            var favori =  await _favoriRepository.AddVoitureToFavori(model.VoitureId, model.UserId);
             if(favori is null)
            {
                return BadRequest("something went wrong");
            }
             return Ok(favori);
        }
        [HttpDelete] 
        public async Task<IActionResult> Delete([FromBody] FavoriModel model)
        {
            if (await _userManager.FindByIdAsync(model.UserId) is null)
            {
                return BadRequest("id user not found");

            }
            if (await _voitureRepository.GetVoitureById(model.VoitureId) is null)
            {
                return BadRequest("id voiture not found");

            }
            if ( ! _favoriRepository.Exist(model.VoitureId, model.UserId))
            {
                return BadRequest("voiture n'est pas  en favoris");
            }
            bool favori = await _favoriRepository.removeFromFavori(model.VoitureId, model.UserId);
            if (favori) return Ok(favori);
            else return BadRequest("something went wrong ");
        }

    }
}
