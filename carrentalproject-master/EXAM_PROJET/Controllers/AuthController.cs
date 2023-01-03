using EXAM_PROJET.Models.User;
using EXAM_PROJET.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.RegisterAsync(model);
            if (!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }
            return Ok(result);

        }


        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.GetTokenAsync(model);
            if (!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }
            return Ok(result);

        }

        
        [HttpPost("addrole")]
        public async Task<IActionResult> AddRoleAsync([FromBody] ManageRoleModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.AddRoleAsync(model);

            if (!string.IsNullOrEmpty(result))
            {
                return BadRequest(result);
            }
            return Ok(model);

        }
        [Authorize(Roles = "Admin")]
        [HttpPost("removerole")]
        public async Task<IActionResult> RemoveRoleAsync([FromBody] ManageRoleModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var result = await _authService.RemoveRoleAsync(model);

            if (!string.IsNullOrEmpty(result))
            {
                return BadRequest(result);
            }
            return Ok(model);

        }
    }
}
