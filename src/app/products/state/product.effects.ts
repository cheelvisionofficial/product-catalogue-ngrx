import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { ProductsService } from '../services/product.service.ts';
import {
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  // ---------------------------
  // Load Products (GET)
  // ---------------------------
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          map((products) =>
            ProductActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(
              ProductActions.loadProductsFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  // ---------------------------
  // Add Product (POST)
  // ---------------------------
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) =>
        this.productsService.addProduct(product).pipe(
          map((newProduct) =>
            ProductActions.addProductSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(
              ProductActions.addProductFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  // ---------------------------
  // Update Product (PUT)
  // ---------------------------
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        this.productsService.updateProduct(product).pipe(
          map((updated) =>
            ProductActions.updateProductSuccess({ product: updated })
          ),
          catchError((error) =>
            of(
              ProductActions.updateProductFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  // ---------------------------
  // Delete Product (DELETE)
  // ---------------------------
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.deleteProduct(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(
              ProductActions.deleteProductFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
