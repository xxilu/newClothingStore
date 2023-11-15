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
  priceItem: any

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
  InCreaseQuantity(prodID: number, size: string) {
    this.shoppingCart.PlusQuantity(prodID, size);
    this.quantityCart = this.shoppingCart.getQuantity();
    this.finalPrice = this.shoppingCart.getPrice();
  }
  DeCreaseQuantity(prodID: number, size: string) {
    this.shoppingCart.MinusQuantity(prodID, size);
    this.quantityCart = this.shoppingCart.getQuantity();
    this.finalPrice = this.shoppingCart.getPrice();
  }

  DeleteProduct(prodID: number, size: string) {
    this.shoppingCart.DeleteProdCart(prodID, size);
    this.cartItem = this.shoppingCart.cartItem;
    this.quantityCart = this.shoppingCart.getQuantity();
    this.finalPrice = this.shoppingCart.getPrice();
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
          price: item.officialPrice * item.quantity
        }
        this.product.reduceAmount(item.productID, item.productSize, item.quantity).subscribe(
          response => {
            console.log('Số lượng sản phẩm đã được giảm.');
            // Thực hiện xử lý sau khi giảm số lượng sản phẩm thành công
          },
          error => {
            console.error('Lỗi khi giảm số lượng sản phẩm: ', error);
            // Xử lý lỗi nếu có
          }
        )
        // const updateRequest = new Promise((resolve, reject) => {
          // this.product.getProductIdAPI(item.productID).subscribe((productDetail: { productId: number; amount1: number; amount2: number; amount3: number; }) => {
          //   if (item.productID === productDetail.productId) {
          //     if (item.productSize === "S") {
          //       productDetail.amount1 -= item.quantity;

          //     } if (item.productSize === "M") {
          //       productDetail.amount2 -= item.quantity;

          //     } if (item.productSize === "L") {
          //       productDetail.amount3 -= item.quantity;

          //     }
          //     this.product.updateProduct(productDetail).subscribe({
          //       next: (data) => {
          //         console.log('Đã cập nhật thông tin sản phẩm sau khi trừ số lượng', data);
          //       }
          //       , error: (error) => {
          //         console.error('Lỗi khi cập nhật thông tin sản phẩm', error);
          //       }, complete: () => {
          //         console.log('Hoàn thành.');
          //       }
          //     });
           
          //   }
          // })
        // })

        // this.shoppingCart.PayMent(cartitem, item.quantity, item.productSize).subscribe({
        //   next: (data: any) => {
        //     console.log('Đặt hàng thành công', data);
        //   },
        //   error: (error: any) => {
        //     // Xử lý lỗi ở đây
        //     console.error('Lỗi khi đặt hàng', error);
        //   },
        //   complete: () => {
        //     // Xử lý khi hoàn thành ở đây (tùy chọn)
        //     console.log('Hoàn thành.');
        //   }

        // });
      
      })
      this.shoppingCart.cartItem = this.cartItem;
      this.router.navigate(['payment'])
    }
    else {
      // alert("Vui lòng đăng nhập")
      this.router.navigate(['login'])
    }
  }

}