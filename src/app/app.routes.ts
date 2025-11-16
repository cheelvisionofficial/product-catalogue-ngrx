import { Routes } from '@angular/router';
import { ProductList } from './products/components/product-list/product-list';
import { ProductDetail } from './products/components/product-detail/product-detail';
import { ProductFormComponent } from './products/components/product-form/product-form';

export const routes: Routes = [
  // Specific routes first
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetail },

  // Then list
  { path: '', component: ProductList },

  // Optional: wildcard redirect
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
