import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  @Input() products: any = [];
  @Output() deleteProductEmitter: any = new EventEmitter();
  @Output() editProductEmitter: any = new EventEmitter();
  @Output() createNewProductEmitter: any = new EventEmitter();

  creatingNew: boolean = false;

  createNewPrice: string = '';
  createNewRating: string = '';
  createNewUrl: string = '';

  editRating: string = '';
  editPrice: string = '';
  editUrl: string = '';

  deleteProduct(product: Product) {
    this.deleteProductEmitter.emit(product);
  }

  showEditFields(product: any) {
    product.hideMe = !product.hideMe;
  }

  saveEdits(product: any) {
    this.removeDollarSign();
    let newData = {
      id: product.id,
      price: this.editPrice,
      rating: this.editRating,
      url: this.editUrl,
    };

    this.products.map((el: any) => {
      if (el.id === product.id) {
        el.price = this.editPrice !== '' ? this.editPrice : product.price;
        el.rating = this.editRating !== '' ? this.editRating : product.rating;
        el.url = this.editUrl !== '' ? this.editUrl : product.url;
      }
    });

    console.log(newData);
    this.editProductEmitter.emit(newData);
    product.hideMe = !product.hideMe;
    this.resetInputFields();
  }

  createNewProduct() {
    this.removeDollarSign();
    let newProduct = {
      price: this.createNewPrice,
      rating: this.createNewRating,
      url: this.createNewUrl,
    };

    if (
      newProduct.price !== '' &&
      newProduct.rating !== '' &&
      newProduct.url !== ''
    ) {
      this.products.unshift(newProduct);
      this.createNewProductEmitter.emit(newProduct);
      this.resetInputFields();
      this.creatingNew = false;
    }
  }

  resetInputFields() {
    this.editPrice = '';
    this.editRating = '';
    this.editUrl = '';
    this.createNewPrice = '';
    this.createNewRating = '';
    this.createNewUrl = '';
  }

  removeDollarSign() {
    if (this.editPrice.indexOf('$') !== -1) {
      this.editPrice = this.editPrice.slice(1, this.editPrice.length);
    }

    if (this.createNewPrice.indexOf('$') !== -1) {
      this.createNewPrice = this.createNewPrice.slice(
        1,
        this.createNewPrice.length
      );
    }
  }
}
