namespace EXAM_PROJET.Models.User
{
    public class AuthModel
    {
        public string UserName { get; set; }    
        public string Message { get; set; } 
        public bool IsAuthenticated { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresOn { get; set; }

    }
}
