namespace DatingSite_API.Models
{
    public class Like
    {
        public int UserLikesId { get; set; }
        public int UserIsLikedId { get; set; }


        public User UserLikes { get; set; }
        public User UserIsLiked { get; set; }
    }
}