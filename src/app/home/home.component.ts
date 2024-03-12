import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environment';
import { Products, Product, Options } from '../../types';
import { ProductsService } from '../services/products.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pageNum: number = 0;
  products: any = [];
  perPage: number = 10;
  totalProductsInDB: number = 0;

  requestOptions: any = {
    params: { pageNum: this.pageNum, perPage: this.perPage },
    responseType: 'json',
  };

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.requestOptions.params = {
      pageNum: this.pageNum,
      perPage: this.perPage,
    };

    this.productsService
      .getProducts(`${environment.apiUrl}/products`, this.requestOptions)
      .subscribe((data: Products) => {
        this.products = data.items;
        this.totalProductsInDB = data.total;
        this.addZero();
        console.log(this.products, data);
      });
  }

  addZero() {
    this.products.forEach((product: Product) => {
      if (product.price.length < 4) {
        product.price += '0';
      }
    });
  }

  nextPage() {
    if ((this.pageNum + 1) * this.perPage < this.totalProductsInDB) {
      this.pageNum++;
      this.requestOptions.params.pageNum++;
      this.fetchProducts();
    }
  }

  prevPage() {
    if (this.pageNum > 0) {
      this.pageNum--;
      this.requestOptions.params.pageNum--;
      this.fetchProducts();
    }
  }

  editProduct($event: any) {
    this.requestOptions.params = {
      id: $event.id,
      price: $event.price,
      rating: $event.rating,
      url: $event.url,
    };

    this.productsService
      .editProduct(
        `${environment.apiUrl}/products`,
        this.requestOptions.parms,
        this.requestOptions
      )
      .subscribe((data) => {});
  }

  createProduct($event: any) {
    this.requestOptions.params = {
      price: $event.price,
      rating: $event.rating,
      url: $event.url,
    };

    this.productsService
      .createProduct(
        `${environment.apiUrl}/products`,
        this.requestOptions.params,
        this.requestOptions
      )
      .subscribe((data) => {});
  }

  deleteProduct($event: any) {
    this.products = this.products.filter((el: any) => el.id !== $event.id);
    this.requestOptions.params.id = $event.id;
    this.productsService
      .deleteProduct(`${environment.apiUrl}/products`, this.requestOptions)
      .subscribe((data) => {});
  }
}
