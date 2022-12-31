using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModeleController:ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IModeleRepository _modeleRepository;
        public ModeleController(ApplicationDbContext context,IModeleRepository modeleRepository )
        {
            _context = context;
             _modeleRepository= modeleRepository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var modele = await _modeleRepository.GetAllModele();
            return Ok(modele);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _modeleRepository.GetModele(id);
            if (product == null)
                return NotFound();
            return Ok(product);

        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchbyName([FromQuery] string? name, [FromQuery] int? id)
        {

            var result = await _modeleRepository.getModeleLike(name,id);
            if (result.Any())
            {
                return Ok(result);
            }
            return Ok(new List<Marque>());


        }
        [Authorize(Roles = "Admin")]


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ModeleModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Marques.FirstOrDefaultAsync(m => m.MarqueId == model.MarqueId);
            if (product == null)
                return BadRequest("id marque n'exist pas");
            var vr = await _modeleRepository.AddModele(model);
            if(vr is null) { return BadRequest("something went wrong"); }
            return Ok(vr);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] ModeleModel productData, int id)
        {
            if (productData == null || id == 0)
                return BadRequest();

            var product = await _context.Modeles.FindAsync(id);
             
            if (product == null)
                return BadRequest("id modele n'exist pas");
            var marq = await _context.Marques.FindAsync(productData.MarqueId);
            if (marq is null)
                return BadRequest("id marque foreign key n'exist pas ");
            bool t = await _modeleRepository.UpdateModele(productData, id);

            return Ok(t);

        }
        [Authorize(Roles = "Admin")]

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool v = await _modeleRepository.DeleteModele(id);
            if (!v) return BadRequest("id modele do not exist or id voitures use this modele");

            return Ok(v);

        }
    }
}
