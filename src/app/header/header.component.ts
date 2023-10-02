import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  totalCart: number = 0;
  constructor( private router: Router, private authenticationService: AuthenticationService) {}
  ngOnInit(): void {
    // this.totalCart = this.shoppingCartService.GetTotalCart();
   

    // this.authenticationService.userLoginEmitter.subscribe((event) => {
    //   this.customerName = event
    // })
    // this.authenticationService.customerStated.subscribe((event) => {
    //   this.customerState = event
    // })
    
    // this.cartService.cartQuantityChanged.subscribe(count => {
    //   this.totalCart = count;
    // })
  }

  SearchSubmit(form:NgForm){
    // alert(form.value.search_string);
    const searchString = form.value.search_string;
    form.reset();
    this.router.navigate(['/search', searchString]);

  }

  // onLogOut() {
  //   this.authenticationService.LogOut();
  // }

  // onOrderList() {
  //   this.router.navigate(['order-list'])
  // }

}
