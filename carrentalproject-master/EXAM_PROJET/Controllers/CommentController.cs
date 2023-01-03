using EXAM_PROJET.Models.Comment;
using EXAM_PROJET.Models.User;
using EXAM_PROJET.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVoitureRepository _voitureRepository;
        private readonly ICommentRepository _commentRepository;

        public CommentController(UserManager<ApplicationUser> userManager, IVoitureRepository voitureRepository, ICommentRepository commentRepository)
        {
            this._commentRepository = commentRepository;
            this._userManager = userManager;
            _voitureRepository = voitureRepository;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Getl(int id)
        {
            if (await _voitureRepository.GetVoitureById(id) is null)
            {
                return BadRequest("id voiture n'exist pas ");
            }
            var product = await _commentRepository.getCommentByVoitureId(id);

            return Ok(product);

        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CommentModel model)
        {
            if(await _userManager.FindByIdAsync(model.UserId) is null)
            {
                BadRequest("user id n'exist pas ");
            }
            if (await _voitureRepository.GetVoitureById(model.VoitureId) is null)
            {
                return BadRequest("id voiture n'exist pas ");
            }
            var v = await _commentRepository.addCommentByVoitureId(model);
            return Ok(v);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           var v = await  _commentRepository.removeComment(id);
            return Ok(v);

        }


    }
}
