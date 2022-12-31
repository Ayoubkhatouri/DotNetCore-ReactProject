using EXAM_PROJET.Models;
using EXAM_PROJET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffreController : ControllerBase
    {
        private readonly IOffreRepository _offreRepository;
        private readonly IVoitureRepository _voitureRepository;

        public OffreController(IOffreRepository offreRepository, IVoitureRepository voitureRepository)
        {
            _offreRepository = offreRepository;
            _voitureRepository = voitureRepository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var modele = await _offreRepository.GetVoitures();
            return Ok(modele);
        }
        [Authorize(Roles = "Admin,Locataire,Proprietaire")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OffreModel m )
        {

            if (await _voitureRepository.GetVoitureById(m.voitureId) is null)
            {
                return BadRequest("id voiture not found");

            }
            if (await _offreRepository.exist(m.voitureId))
            {
                return BadRequest("voiture deja en offre");
            }
            var favori = await _offreRepository.AddVoiture(m.voitureId, m.montant);
            if (favori is null)
            {
                return BadRequest("something went wrong");
            }
            return Ok(favori);
        }

        [Authorize(Roles = "Admin,Locataire,Proprietaire")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            if (!await _offreRepository.exist(id))
            {
                return BadRequest("cet voiture n'est pas en offre");
            }
            bool v = await _offreRepository.removeVoiture(id);
            if (!v) return BadRequest("somehting went wrong");

            return Ok(v);

        }
        [Authorize(Roles = "Admin,Locataire,Proprietaire")]

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] OffreModel m, int id)
        {
            if (await _voitureRepository.GetVoitureById(m.voitureId) is null)
            {
                return BadRequest("id voiture not found");

            }

            var offre = await _offreRepository.updateOffre(m.voitureId, m.montant);
            if (offre is null) { BadRequest("something went wrong"); }
            return Ok(offre);
        }
        [HttpGet("exist/{id}")]
        public async Task<IActionResult> Exist(int id)
        {
            var offre = await _offreRepository.exist(id);
            return Ok(offre);
        }
    }
}
