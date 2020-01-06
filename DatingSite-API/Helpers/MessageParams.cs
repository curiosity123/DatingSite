namespace DatingSite_API.Helpers
{
    public class MessageParams
    {
        public const int MaxPageSize = 48;
        public int CurrentPage { get; set; } = 1;

        private int pageSize = 24;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? 48 : value; }
        }

        public int UserId { get; set; }

        public string MessageContainer { get; set; }="unread";

    }
}