using EXAM_PROJET.Data;
using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using EXAM_PROJET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarqueController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMarqueRepository _marqueRepository;
        public MarqueController(ApplicationDbContext context, IMarqueRepository marqueRepository)
        {
            _context = context;
            _marqueRepository = marqueRepository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var marque = await _marqueRepository.GetAllMarque();

            return Ok(marque);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _marqueRepository.GetMarque(id);
            if (product == null)
                return NotFound();
            return Ok(product);

        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchbyName([FromQuery] string name)
        {

            var result = await _marqueRepository.getMarqueLike(name);
            if (result.Any())
            {
                return Ok(result);
            }
            return Ok(new List<Marque>());
        }

        [Authorize(Roles = "Admin")]

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MarqueModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var vr = await _marqueRepository.AddMarque(model);
            if (vr is null) { return BadRequest("something went wrong !"); }
            return Ok(vr);
        }
        [Authorize(Roles = "Admin")]

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] MarqueModel productData,  int id)
        {
            if (productData == null || id == 0)
                return BadRequest();

            var product = await _context.Marques.FindAsync(id);
            if (product == null)
                return BadRequest("id marque n'exist pas");
            bool t = await _marqueRepository.UpdateMarque(productData, id);

            return Ok(t);

        }
        [Authorize(Roles = "Admin")]

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool v = await _marqueRepository.DeleteMarque(id);
            if(!v) return BadRequest("id do not exist");

            return Ok(v);

        }


    }
}