import { Product } from "./product.models";

/** Product State Interface */
export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
