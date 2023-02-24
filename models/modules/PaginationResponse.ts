export interface PaginationResponse<T> {
  currentPage: number;
  totalPages: number;
  itemPerPage: number;
  totalCount: number;
  results: T;
}
