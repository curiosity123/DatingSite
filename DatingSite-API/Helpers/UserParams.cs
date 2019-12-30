namespace DatingSite_API.Helpers
{
    public class UserParams
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
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;
        public string City { get; set; }

        public string MartialStatus { get; set; }
        public string Children { get; set; }

        public bool SortByLastActive {get;set;}= false;
    }
}