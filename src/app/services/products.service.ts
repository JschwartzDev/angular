import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Options, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}
  getProducts = (url: string, options: Options): Observable<Products> => {
    return this.apiService.get(url, options);
  };
}
