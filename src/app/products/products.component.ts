import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Options, Products, Product } from '../../types';
import { ProductsService } from '../services/products.service';
import { environment } from '../environment';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnChanges {
  @Input() pageNum?: number = 0;
  constructor(private productsService: ProductsService) {}
  products: any = [];
  perPage: number = 10;

  requestOptions: Options = {
    params: { pageNum: this.pageNum, perPage: this.perPage },
    responseType: 'json',
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchProducts();
    console.log(this.requestOptions);
  }

  fetchProducts() {
    this.productsService
      .getProducts(`${environment.apiUrl}/products`, this.requestOptions)
      .subscribe((data: Products) => {
        this.products = data;
        this.addZero();
        console.log(this.products);
      });
  }

  addZero() {
    this.products.forEach((product: Product) => {
      if (product.price.length < 4) {
        product.price += '0';
      }
    });
  }
}
