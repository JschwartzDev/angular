import { Component, OnInit, OnChanges } from '@angular/core';
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
export class HomeComponent {
  pageNum: number = 0;

  nextPage() {
    this.pageNum++;
  }

  prevPage() {
    this.pageNum--;
  }
}
