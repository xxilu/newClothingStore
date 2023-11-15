import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItem: CartItem[] = []
  orderIdByUser: any
  finalPrice: any
  diachi: string = " "
  customerInfo: any
  date: any

  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private productService: ProductService, private authen: AuthenticationService) { }
  ngOnInit(): void {
    this.cartItem = this.shoppingCartService.cartItem
    this.finalPrice = this.shoppingCartService.getPrice()
    // this.customerInfo = this.authenticationService.customerInfo
    this.date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate();
  }
  onPaymentConfirmed() {
    // Gọi phương thức checkout của CartService để lưu thông tin đơn hàng
    console.log('Giá trị nhập vào là: ' + this.diachi);
    const order = {
      userId: this.authen.getCurrentUser(),
      orderDate: new Date(this.date).toISOString(),
      orderSize: '',
      orderAddress: this.diachi,
      orderQuantity: this.shoppingCartService.getQuantity(),
      orderPrice: this.finalPrice,
      orderStatus: 0

    }
    console.log(order)

    this.shoppingCartService.PostOrder(order).subscribe(
      (response) => {
        this.orderIdByUser = response.orderId
        console.log("Thành công")
        console.log("Day la list:" + response)
        console.log(this.orderIdByUser)
        // console.log(this.lstCartItems)
        this.cartItem.forEach(item => {
          const orderDetail = {
            orderId: this.orderIdByUser,
            productId: item.productID,
            size: item.productSize,
            price: item.officialPrice * item.quantity,
            quantity: item.quantity 
          };
          console.log(orderDetail)

          this.shoppingCartService.PostOrderDetails(orderDetail).subscribe(
            (response) => {

              console.log(response)
            }
          )
        });
      }
    )
    console.log(this.cartItem)
    // this.shoppingCartService.checkout(order);
    this.shoppingCartService.ClearCart()
    // alert(order)
    this.router.navigate(['thanks'])
  }
  onPaymentCancel(){
    this.cartItem.forEach(item => {
      this.productService.increaseAmount(item.productID, item.productSize, item.quantity).subscribe(
        response => {
          console.log('Số lượng sản phẩm đã được tăng lại');
          // Thực hiện xử lý sau khi giảm số lượng sản phẩm thành công
        },
        error => {
          console.error('Lỗi khi tăng số lượng sản phẩm: ', error);
          // Xử lý lỗi nếu có
        }
      )
    })
  }
  // onCheckOut() {
  //   const order = {
  //     // userId: this.authenticationService.customerInfo.userId,
  //     totalPrice: this.finalPrice,
  //     totalQuantity: this.cartService.GetTotalCart(),
  //     orderDate: new Date(this.date).toISOString(),
  //     orderAddress: this.addressData,
  //     statusOrder: 0
  //   }

  //   this.cartService.PostOrder(order).subscribe(
  //     (response) => {
  //       this.orderIdByUser = response.orderId
  //       console.log("Thành công")
  //       console.log("Day la list:" + response)
  //       console.log(this.orderIdByUser)
  //       // console.log(this.lstCartItems)
  //       this.lstCartItems.forEach(item => {
  //         const orderDetail = {
  //           orderId: this.orderIdByUser,
  //           productId: item.productID,
  //           unitPrice: item.price,
  //           quantity: item.quantity
  //         };
  //         console.log(orderDetail)

  //         this.cartService.PostOrderDetails(orderDetail).subscribe(
  //           (response) => {
  //             console.log(response)
  //           }
  //         )
  //       });



  //     }

  //   )


  //   this.cartService.ClearCart()
  //   alert("thanh cong")
  //   this.router.navigate(['thanks-page'])
  // }

}
