export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Product {
  category: string;
  url: string;
}
