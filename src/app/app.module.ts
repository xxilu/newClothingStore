import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './body/home/home.component';
import { BodyComponent } from './body/body.component';
import { ProductListComponent } from './body/product-list/product-list.component';
import { ProductCardComponent } from './body/product-card/product-card.component';
import { ProductDetailComponent } from './body/product-detail/product-detail.component';
import { ShoppingCartComponent } from './body/shopping-cart/shopping-cart.component';
import { PaymentComponent } from './body/payment/payment.component';

const routes: Routes = [
  { path: 'body', component: BodyComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },


  

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BodyComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    PaymentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes) ,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
