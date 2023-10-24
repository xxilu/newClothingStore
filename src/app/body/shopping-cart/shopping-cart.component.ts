import { Component, OnInit } from '@angular/core';
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
export class ShoppingCartComponent implements OnInit {

  cartItem: CartItem[] = [];
  order: any
  quantityCart = 0;
  finalPrice = 0;
  selectedProduct: any
  selectedSize: string = ''
  orderedProducts: any[] = []; // Mảng chứa thông tin đặt hàng của các sản phẩm và kích thước
  products: any
  productIDD: any

  constructor(
    private shoppingCart: ShoppingCartService
    , private router: Router
    , private product: ProductService
    , private authenticationService: AuthenticationService
    , private route: ActivatedRoute

  ) { }
  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    // this.productIDD = Number(this.route.snapshot.paramMap.get('id'));
    // this.category = "this.productService.getCategoryByIDProd(this.productID)";

    // this.products = this.product.getProductIdAPI(this.productIDD);

    // this.product.getProductIdAPI(this.productID).subscribe((prod: number) => {
    //   this.products = prod
    // })

    // })
    // this.product.getProductListAPI().subscribe((data: any) => {
    //   this.products = data; // Gán dữ liệu nhận được từ API vào biến products
    // });
    // this.products = this.product.getProductListAPI();

    this.quantityCart = this.shoppingCart.getQuantity();
    this.finalPrice = this.shoppingCart.getPrice();
    this.cartItem = this.shoppingCart.cartItem;
    this.products = this.product.getProductIdAPI
    // this.products = this.product.getProductListAPI

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
      // const updateRequests: any[] = [];
      const updateRequests: Promise<any>[] = [];

      this.cartItem.forEach(item => {
        const cartitem = {
          productId: item.productID,
          productName: item.productName,
          size: item.productSize,
          imgpath: item.imgPath,
          quantity: item.quantity,
          price: this.finalPrice
        }
        // const updateRequest = new Promise((resolve, reject) => {
          this.product.getProductIdAPI(item.productID).subscribe((productDetail: { productId: number; amount1: number; amount2: number; amount3: number; }) => {
            if (item.productID === productDetail.productId) {
              if (item.productSize === "S") {
                productDetail.amount1 -= item.quantity;

              } if (item.productSize === "M") {
                productDetail.amount2 -= item.quantity;

              } if (item.productSize === "L") {
                productDetail.amount3 -= item.quantity;

              }
              this.product.updateProduct(productDetail).subscribe({
                next: (data) => {
                  console.log('Đã cập nhật thông tin sản phẩm sau khi trừ số lượng', data);
                }
                , error: (error) => {
                  console.error('Lỗi khi cập nhật thông tin sản phẩm', error);
                }, complete: () => {
                  // Xử lý khi hoàn thành ở đây (tùy chọn)
                  // console.log('Hoàn thành.');
                }
              });
              // this.product.updateProduct(productDetail).subscribe({
              //   next: (data) => {
              //     resolve(data);
              //   },
              //   error: (error) => {
              //     reject(error);
              //   }
              // });
            }
          })
        // })
        // updateRequests.push(updateRequest);
        this.shoppingCart.PayMent(cartitem).subscribe({
          next: (data) => {
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
        // Promise.all(updateRequests)
        //   .then(updatedProducts => {
        //     console.log('Đã cập nhật thông tin sản phẩm sau khi trừ số lượng', updatedProducts);
        //     // Thực hiện logic đặt hàng và chuyển hướng tại đây sau khi tất cả các sản phẩm đã được cập nhật thành công
        //   })
        //   .catch(error => {
        //     console.error('Lỗi khi cập nhật thông tin sản phẩm', error);
        //   });

      })
      // this.router.navigate(['payment'])
    }
    else {
      // alert("Vui lòng đăng nhập")
      this.router.navigate(['login'])
    }
  }

}