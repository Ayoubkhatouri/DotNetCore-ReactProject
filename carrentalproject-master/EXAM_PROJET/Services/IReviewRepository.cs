using EXAM_PROJET.Models.Reviews;

namespace EXAM_PROJET.Services
{
    public interface IReviewRepository
    {
        public Task<bool> ReviewExist(int voitureId, string userId);
        public Task<int> GetNombreReview(int voitureId);
        public Task<int> GetReview(int voitureId);
        public Task<int> CreateReview(ReviewModel model);
        public Task<int> updateReview(ReviewModel model);
        public Task<List<Review>> GetAll();


    }
}
