using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingSite_API.Helpers
{
    public class PagedList<T> : List<T>
    {

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }


        public PagedList(List<T> items, int totalCount, int currentPage, int pageSize)
        {
            PageSize = pageSize;
            CurrentPage = currentPage;
            TotalCount = totalCount;
            TotalPages = (int)Math.Ceiling(totalCount / (double)PageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreatedListAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var totalCount = await source.CountAsync();
            var items = await source.Skip((pageNumber-1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, totalCount, pageNumber, pageSize);
        }
    }
}