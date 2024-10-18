export type PaginationLinks = {
  first: string;
  prev: string | null;
  next: string | null;
  last: string;
};

export class PaginationResult {
  totalRecords: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  data: any[];
  links: PaginationLinks;
}
