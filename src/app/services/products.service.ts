import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}
  getProducts = (url: string, options: any): Observable<Products> => {
    return this.apiService.get(url, options);
  };

  editProduct = (
    url: string,
    body: any,
    options: any
  ): Observable<Products> => {
    return this.apiService.put(url, body, options);
  };

  createProduct = (
    url: string,
    body: any,
    options: any
  ): Observable<Products> => {
    return this.apiService.post(url, body, options);
  };

  deleteProduct = (url: string, options: any): Observable<Products> => {
    return this.apiService.delete(url, options);
  };
}
