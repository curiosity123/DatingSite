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
            set { pageSize = (value> MaxPageSize)? 48 : value; }
        }
        
    }
}