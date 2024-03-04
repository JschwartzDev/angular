import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environment';
import { Products, Product } from '../../types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  products: any = [];
  numPages: number = 0;

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService
      .getProducts(`${environment.apiUrl}/products`, { page: 0, perPage: 5 })
      .subscribe((data: Products) => {
        this.products = data;
        this.numPages = this.products.length / 10;
        console.log(this.products);
      });
  }
}
