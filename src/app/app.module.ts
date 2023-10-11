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
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ProductsComponent } from './admin-body/products/products.component';
import { CategoriesComponent } from './admin-body/categories/categories.component';
import { ProductsCreateComponent } from './admin-body/products/products-create/products-create.component';
import { ProductsEditComponent } from './admin-body/products/products-edit/products-edit.component';
import { ProductsDeleteComponent } from './admin-body/products/products-delete/products-delete.component';
import { CategoriesCreateComponent } from './admin-body/categories/categories-create/categories-create.component';
import { CategoriesEditComponent } from './admin-body/categories/categories-edit/categories-edit.component';
import { CategoriesDeleteComponent } from './admin-body/categories/categories-delete/categories-delete.component';
import { OrdersComponent } from './admin-body/orders/orders.component';
import { ThanksComponent } from './body/thanks/thanks.component';
import { OrdersDetailComponent } from './admin-body/orders/orders-detail/orders-detail.component';

const routes: Routes = [
  { path: 'body', component: BodyComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products-create', component: ProductsCreateComponent },
  { path: 'products-edit/:id', component: ProductsEditComponent },
  { path: 'products-delete/:id', component: ProductsDeleteComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories-create', component: CategoriesCreateComponent },
  { path: 'categories-edit', component: CategoriesEditComponent },
  { path: 'categories-delete/:id', component: CategoriesDeleteComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: 'orders-detail/:id', component: OrdersDetailComponent },






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
    AdminSidebarComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    ProductsDeleteComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent,
    CategoriesDeleteComponent,
    OrdersComponent,
    ThanksComponent,
    OrdersDetailComponent,

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
