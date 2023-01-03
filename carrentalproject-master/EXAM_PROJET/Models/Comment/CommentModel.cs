namespace EXAM_PROJET.Models.Comment
{
    public class CommentModel
    {
        public int? Id { get; set; }
        public string UserId { get; set; }
        public int VoitureId { get; set; }
        public string comment { get; set; }

    }
}
