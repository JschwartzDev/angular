import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface Products {
  items: Product[];
  total: number;
}

export interface Product {
  id: number;
  price: string;
  rating: string;
  url: string;
}

export interface Options {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body' | 'events' | 'response';
  params?:
    | HttpParams
    | {
        [param: string]:
          | undefined
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}
