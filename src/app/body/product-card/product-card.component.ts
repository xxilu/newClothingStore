import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  products: any;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.ProductList()

  }
  ProductList() {
    this.productService.getProductListAPI().subscribe(data => {
      this.products = data;
    })
  }
}

