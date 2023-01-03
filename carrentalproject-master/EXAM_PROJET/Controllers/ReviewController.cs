using EXAM_PROJET.Models.Reviews;
using EXAM_PROJET.Models.User;
using EXAM_PROJET.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EXAM_PROJET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController:ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IReviewRepository _reviewRepository;
        private readonly IVoitureRepository _voitureRepository;

        public ReviewController(UserManager<ApplicationUser> userManager, IReviewRepository reviewRepository, IVoitureRepository voitureRepository)
        {
            _userManager = userManager;
            _reviewRepository = reviewRepository;
            _voitureRepository = voitureRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReviewModel model)
        {
            if (await _userManager.FindByIdAsync(model.UserId) is null)
                return BadRequest("id user n'exist pas ");

            if (await _voitureRepository.GetVoitureById(model.VoitureId) is null)
            {
                return BadRequest("id voiture n'exist pas ");
            }
            bool exist = await _reviewRepository.ReviewExist(model.VoitureId, model.UserId);
            int result;
            if (exist)
            {
              result=  await _reviewRepository.updateReview(model);
            }
            else
            {
              result =  await _reviewRepository.CreateReview(model);
            }
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _reviewRepository.GetAll();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReview(int id)
        {
            if (await _voitureRepository.GetVoitureById(id) is null)
            {
                return BadRequest("id voiture n'exist pas ");
            }
            var nbr = await _reviewRepository.GetReview(id);
            return Ok(nbr);
        }

        [HttpGet("nombre/{id}")]
        public async Task<IActionResult> GetNombre(int id)
        {
            if (await _voitureRepository.GetVoitureById(id) is null)
            {
                return BadRequest("id voiture n'exist pas ");
            }
            var nbr = await _reviewRepository.GetNombreReview(id);
            return Ok(nbr);
        }
    }
}
