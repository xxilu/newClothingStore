import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  products: any;
  selectedCategory: any
  sorted: boolean = false;

  constructor(private productService: ProductService, private shoppingCart: ShoppingCartService, private route: ActivatedRoute, private router: Router) { }
  // categoryId: any
  cateState: any
  addtocart: any


  ngOnInit(): void {
    this.route.params.subscribe(() => {
      const categoryId = Number(this.route.snapshot.paramMap.get('id'));
      if (categoryId == 0) {
        this.loadList()
      }
      else {
        this.productService.getProductByCate(categoryId).subscribe((list) => {
          this.cateState = true
          this.products = list.reverse();
          console.log('trang thai', this.cateState)
          // this.loadList();
        });
        // console.log(categoryId)
        // this.addtocart = this.shoppingCart.addToCart
        // if (this.sorted) {
        //   this.loadList();
        //   this.sorted = false;
        // }
      }

    })
  }
  loadList() {
 
      this.productService.getProductListAPI().subscribe((list) => {
        this.products = list;
      });
    

  }

  SortIncreaseByPrice() {
    this.router.navigate(['/product-list']);
    this.products.sort((a: { officialPrice: number; }, b: { officialPrice: number; }) => a.officialPrice - b.officialPrice)
    // this.products = [...this.products]; 
    // this.sorted = true;

  }
  SortDecreaseByPrice() {
    this.router.navigate(['/product-list']);  
    this.products.sort((a: { officialPrice: number; }, b: { officialPrice: number; }) => b.officialPrice - a.officialPrice)
    // this.products = [...this.products]; 
    // this.sorted = true;



  }
}
