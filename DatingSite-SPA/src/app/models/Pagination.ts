export interface Pagination {
  CurrentPage: number;
  PageSize: number;
  TotalItems: number;
  TotalPages: number;
}

export class PaginationResult<T> {
  result: T;
  pagination: Pagination;
}
