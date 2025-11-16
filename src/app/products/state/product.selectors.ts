import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

// 1️⃣ Feature Selector
export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

// 2️⃣ Select All Products
export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

// 3️⃣ Select Loading
export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

// 4️⃣ Select Error
export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

// 5️⃣ Select Product by ID
export const selectProductById = (id: number) =>
  createSelector(selectProductsState, (state) =>
    state.products.find((p) => p.id === id)
  );
