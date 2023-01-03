namespace EXAM_PROJET.Models.Reviews
{
    public class ReviewModel
    {
        public int? Id { get; set; }
        public int VoitureId { get; set; }
        public string UserId { get; set; }
        public int rating { get; set; }
    }
}
