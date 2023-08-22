export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

interface PaginatedData<T> {
  data_per_page: T;
  meta: {
    page: number;
    max_page: number;
    total_data: number | null;
    total_active_quiz: number | null;
  };
}

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: PaginatedData<T>;
}
