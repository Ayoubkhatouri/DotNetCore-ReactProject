using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using EXAM_PROJET.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(IUserRepository userRepository,RoleManager<IdentityRole> roleManager)
        {
            _userRepository = userRepository;
            _roleManager = roleManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _userRepository.GetAllUser();

            return Ok(users);
        }
        

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string  id)
        {
            var product = await _userRepository.GetById(id);
            if (product == null)
                return NotFound();
            return Ok(product);

        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchbyName([FromQuery] string? role, [FromQuery] string? name)
        {
           
            var result = await _userRepository.GetByNameOrRole(role, name);
            if (result.Any())
            {
                return Ok(result);
            }
            return Ok(new List<Marque>());


        }

        [Authorize(Roles = "Admin,Locataire,Proprietaire")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] EditUserModel productData, string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (productData == null || String.IsNullOrEmpty(id))
                return BadRequest();

            var product = await _userRepository.GetById(id);

            if (product == null)
                return BadRequest("id user n'exist pas");
          
            bool t = await _userRepository.UpdateUser(productData, id);

            return Ok(t);

        }



    }
}
