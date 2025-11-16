import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../state/product.models';
import { selectProductById } from '../../state/product.selectors';
import { addProduct, updateProduct } from '../../state/product.actions';

export interface ProductForm {
  title: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
  category: FormControl<string>;
  image: FormControl<string>;
}

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
})
export class ProductFormComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private router = inject(Router);

  productId = signal<number | null>(null);
  product = signal<Product | null>(null);

  // ⭐ Strongly typed FormGroup
  protected form = new FormGroup<ProductForm>({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    category: new FormControl<string>('', { nonNullable: true }),
    image: new FormControl<string>('', { nonNullable: true }),
  });

  constructor() {
    const paramId = Number(this.route.snapshot.paramMap.get('id'));

    if (paramId) {
      this.productId.set(paramId);

      this.store.select(selectProductById(paramId)).subscribe((p) => {
        if (p) {
          this.product.set(p);

          // ⭐ Strongly typed prefill
          this.form.patchValue({
            title: p.title,
            price: p.price,
            description: p.description,
            category: p.category,
            image: p.image,
          });
        }
      });
    }
  }

  editProduct = computed(() => this.productId() !== null);

  onSubmit() {
    if (this.form.invalid) return;

    const value = this.form.value as Product;

    if (this.editProduct()) {
      // Edit mode
      this.store.dispatch(
        updateProduct({
          product: { ...value, id: this.productId()! }
        })
      );
    } else {
      // Add mode
      this.store.dispatch(addProduct({ product: value }));
    }

    // Navigate back to product list
    this.router.navigate(['/']);
  }

}
