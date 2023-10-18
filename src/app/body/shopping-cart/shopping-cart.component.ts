import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  cartItem: CartItem[] = [];
  order: any
  quantityCart = 0;
  finalPrice = 0;
  selectedProduct: any
  selectedSize: string = ''
  orderedProducts: any[] = []; // Mảng chứa thông tin đặt hàng của các sản phẩm và kích thước
  products: any
  productID: any

  constructor(
    private shoppingCart: ShoppingCartService
    , private router: Router
    , private product: ProductService
    , private authenticationService: AuthenticationService
    , private route: ActivatedRoute

  ) { }
  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.productID = Number(this.route.snapshot.paramMap.get('id'));
    // this.category = "this.productService.getCategoryByIDProd(this.productID)";

    // this.products = this.product.getProductIdAPI(this.productID);

    // this.product.getProductIdAPI(this.productID).subscribe((prod: number) => {
    //   this.products = prod
    // })

    // })
    this.quantityCart = this.shoppingCart.getQuantity();
    this.finalPrice = this.shoppingCart.getPrice();
    this.cartItem = this.shoppingCart.cartItem;
    this.products = this.product.getProductIdAPI
    // this.orderedProducts = this.shoppingCart.getOrderedProducts();

  }
  get cartItems() {
    if (this.cartItem.length == 0) {
      alert("Chưa có sản phẩm nào trong giỏ hàng")
    }
    return this.shoppingCart.getShoppingCart();
  }
  InCreaseQuantity(prodID: number) {
    this.shoppingCart.PlusQuantity(prodID);
    this.quantityCart = this.shoppingCart.getQuantity();
    // this.finalPrice = this.shoppingCart.GetFinalPrice();
  }
  DeCreaseQuantity(prodID: number) {
    this.shoppingCart.MinusQuantity(prodID);
    this.quantityCart = this.shoppingCart.getQuantity();
    // this.finalPrice = this.shoppingCart.GetFinalPrice();
  }

  DeleteProduct(prodID: number) {
    this.shoppingCart.DeleteProdCart(prodID);
    this.cartItem = this.shoppingCart.cartItem;
    this.quantityCart = this.shoppingCart.getQuantity();
    // this.finalPrice = this.shoppingCart.GetFinalPrice();
  }
  //chỗ này giảm số lượng size trong db

  onPayment() {
    // console.log(this.finalPrice)
    if (this.authenticationService.customerLoginState) {

      this.cartItem.forEach(item => {
        const cartitem = {
          productId: item.productID,
          productName: item.productName,
          size: item.productSize,
          imgpath: item.imgPath,
          quantity: item.quantity,
          price: this.finalPrice
        }
        if (item.productID) {
          if (item.productSize === "S") {
            this.products.amount1 -= item.quantity;
          } 
          else if (item.productSize === "M") {
            this.products.amount2 -= item.quantity;

          }

        }
        // if (item.productID == this.products.productId && item.productSize == "M") {
        //   this.products.amount2 -= item.quantity;

        // }
        console.log(cartitem)
        console.log(item.productID)
        console.log(item.productSize)
        console.log(item.quantity)
        // console.log(this.products.amount2)
        // if (item.productID == this.products.productID && 
        //       (item.productSize == "S" || item.productSize == "M" || item.productSize == "L")) {
        //       if (item.productSize == "S") {
        //         this.products.amount1 -= item.quantity;
        //       } else if (item.productSize == "M") {
        //         this.products.amount2 -= item.quantity;
        //       } else if (item.productSize == "L") {
        //         this.products.amount3 -= item.quantity;
        //       }


        this.shoppingCart.PayMent(cartitem).subscribe({
          next: (data) => {

            // this.cartItem.forEach(element => {
            //   if (data.productID == element.productID && 
            //     (data.productSize == "S" || data.productSize == "M" || data.productSize == "L")) {
            //     if (element.productSize == "S") {
            //       this.products.amount1 -= data.quantity;
            //     } else if (element.productSize == "M") {
            //       this.products.amount2 -= data.quantity;
            //     } else if (element.productSize == "L") {
            //       this.products.amount3 -= data.quantity;
            //     }
            //     console.log(data);
            //   }
            // });
            console.log('Đặt hàng thành công', data);


          },
          error: (error) => {
            // Xử lý lỗi ở đây
            console.error('Lỗi khi đặt hàng', error);
          },
          complete: () => {
            // Xử lý khi hoàn thành ở đây (tùy chọn)
            console.log('Hoàn thành.');
          }
        });
      })
      // this.router.navigate(['payment'])
    }
    else {
      alert("Vui lòng đăng nhập")
      this.router.navigate(['login'])
    }
  }





}