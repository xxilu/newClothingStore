import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  products: any;
  selectedCategory: any
  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  // categoryId: any
  cateState: any
  ngOnInit(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('id'));

    // this.loadList()
    this.productService.getProductByCate(categoryId).subscribe((list) => {
      this.cateState = true
      this.products = list.reverse();
      console.log('trang thai',this.cateState)
      // this.loadList();
    });
    console.log(categoryId)
  }
  // loadList() {
  //   this.productService.getProductByCate(this.categoryId).subscribe((list) => {
  //     this.cateState = true
  //     this.products = list.reverse();
  //     console.log('trang thai',this.cateState)
  //     // this.loadList();
  //   });
  // }
}

