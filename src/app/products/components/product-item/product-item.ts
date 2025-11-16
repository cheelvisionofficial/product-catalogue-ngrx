import { Component, input } from '@angular/core';
import { Product } from '../../state/product.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  imports: [RouterLink]
})
export class ProductItem {
  product = input.required<Product>();
}
