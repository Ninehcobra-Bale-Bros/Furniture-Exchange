import { QueryFilterBase } from 'src/core/base.query';
import { PaginationLinks, PaginationResult } from 'src/core/pagination';

export class PaginationHelper {
  public static generatePagination(
    queries: QueryFilterBase,
    url: string,
    data: any[],
    totalRecords: number,
  ): PaginationResult {
    const totalPage = Math.ceil(totalRecords / queries.limit);
    const currentPage = queries.offset ? queries.offset : 1;

    const links = this.generatePaginationUrls(queries, url, totalPage);

    return {
      totalRecords: totalRecords,
      pageSize: queries.limit,
      currentPage: currentPage,
      totalPages: totalPage,
      data: data,
      links: {
        first: links.first,
        prev: links.prev,
        next: links.next,
        last: links.last,
      },
    };
  }

  public static generatePaginationUrls(
    query: QueryFilterBase,
    url: string,
    totalPage: number,
  ): PaginationLinks {
    const offset = query.offset || 0;

    const fistPage = this.QueryParamsBuilder({ ...query, offset: 1 });
    const lastPage = this.QueryParamsBuilder({ ...query, offset: totalPage });

    const prevPage =
      offset > 1
        ? this.QueryParamsBuilder({ ...query, offset: offset - 1 })
        : null;
    const nextPage =
      offset < totalPage
        ? this.QueryParamsBuilder({ ...query, offset: offset + 1 })
        : null;

    return {
      first: `${url}?${fistPage}`,
      prev: prevPage ? `${url}?${prevPage}` : null,
      next: nextPage ? `${url}?${nextPage}` : null,
      last: `${url}?${lastPage}`,
    };
  }

  public static QueryParamsBuilder(queries: QueryFilterBase): string {
    let params = Object.keys(queries)
      .filter((key) => queries[key] !== undefined && queries[key] !== null)
      .map((key) => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(queries[key]);

        return `${encodedKey}=${encodedValue}`;
      })
      .join('&')
      .toString();

    return params.length ? params : '';
  }
}
