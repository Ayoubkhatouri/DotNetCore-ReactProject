using EXAM_PROJET.Models.Comment;

namespace EXAM_PROJET.Services
{
    public interface ICommentRepository
    {
        public Task<List<CommentGet>> getCommentByVoitureId(int VoitureId);
        public Task<CommentGet> addCommentByVoitureId(CommentModel model);
        public Task<bool> removeComment(int id);

    }
}
