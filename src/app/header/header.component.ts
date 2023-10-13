import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';
import { CartItem } from '../model/cart-item.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quantity: any;
  customerName: string = ''
  customerState: boolean = false;
  cateList: any
  categoryId: any
  cateState: boolean = false
  cartItem: CartItem[] = []
  totalCart = 0

  constructor(private productService: ProductService,private shoppingCartService: ShoppingCartService , private router: Router, private authenticationService: AuthenticationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
   
    
  //   this.shoppingCartService.cartQuantityChanged.subscribe((count: number) => {
  //     this.totalCart = count;
  // })
    this.totalCart = this.shoppingCartService.getQuantity()
   
    this.authenticationService.userLoginEmitter.subscribe((event) => {
      this.customerName = event
    })
    this.authenticationService.customerStated.subscribe((event) => {
      this.customerState = event
    })
    this.productService.getCategoryListAPI().subscribe((categories) => {
      this.cateList = categories;
    });

    // this.quantity = this.shoppingCartService.cartItem.length
    // this.cartItem = this.shoppingCartService.cartItem;
    


    this.shoppingCartService.cartQuantityChanged.subscribe(count => {
      this.totalCart = count;
    })
  }
  // getShoppingCart(): CartItem[] {
  //   return this.cartItem;
  // }
  toFavorList() {
    if (this.authenticationService.customerLoginState) {
      this.router.navigate(['/favorite-list']);
    } else {
      alert("Vui lòng đăng nhập")
      this.router.navigate(['/login']);
    }
  }
  navigateToProductList(categoryId: number) {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log('Category ID:', categoryId);
      // this.cateState = true
      this.router.navigate(['/product-list', categoryId]);
    });

  }
  onSelectCategory(categoryId: number) {
    this.productService.setSelectedCategory(categoryId);
  }

  SearchSubmit(form: NgForm) {
    // alert(form.value.search_string);
    const searchString = form.value.search_string;
    console.log(searchString);

    form.reset();
    this.router.navigate(['/search', searchString]);

  }
  QuantityCart(){
    console.log(this.cartItem)
  }


  // onLogOut() {
  //   this.authenticationService.LogOut();
  // }

  // onOrderList() {
  //   this.router.navigate(['order-list'])
  // }

}
