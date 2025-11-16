import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../state/product.models';
import { selectProductById } from '../../state/product.selectors';
import { deleteProduct } from '../../state/product.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  imports: [RouterLink]
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private router= inject(Router);
  private store = inject(Store);

  product = signal<Product | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch product from NgRx
    this.store.select(selectProductById(id)).subscribe((p) => {
      this.product.set(p ?? null);
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.store.dispatch(deleteProduct({ id: this.product()!.id }));
      this.router.navigate(['/']);
    }
  }
}
