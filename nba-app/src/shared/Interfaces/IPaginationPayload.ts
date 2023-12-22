export interface IPaginationPayload<T> {
  data?: T[];
  meta?: {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
    total_count: number;
  };
  status: number;
}
