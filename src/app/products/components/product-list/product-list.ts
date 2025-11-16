import { Component, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllProducts, selectProductsLoading } from '../../state/product.selectors';
import * as ProductActions from '../../state/product.actions';
import { Product } from '../../state/product.models';
import { ProductItem } from '../product-item/product-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  imports: [ProductItem,RouterLink]
})
export class ProductList {
  private store = inject(Store);

  products = signal<Product[]>([]);
  loading = signal(false);

  constructor() {
    // Sync signals with store
    this.store.select(selectAllProducts).subscribe(this.products.set);
    this.store.select(selectProductsLoading).subscribe(this.loading.set);

    // Load products
    this.store.dispatch(ProductActions.loadProducts());
  }
}
