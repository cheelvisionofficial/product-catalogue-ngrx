import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductsState } from './products.state';

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,

  // ----------------------------
  // Load Products
  // ----------------------------
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ----------------------------
  // Add Product
  // ----------------------------
  on(ProductActions.addProduct, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product],
  })),

  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ----------------------------
  // Update Product
  // ----------------------------
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map((p) =>
      p.id === product.id ? product : p
    ),
  })),

  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ----------------------------
  // Delete Product
  // ----------------------------
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter((p) => p.id !== id),
  })),

  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
