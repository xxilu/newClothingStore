import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Products } from '../model/product.model';
import { CartItem } from '../model/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartItem: CartItem[] = [];
  cartQuantityChanged: EventEmitter<number> = new EventEmitter<number>();
  selectedProduct: any
  private apiUrl = 'https://localhost:7069/api/OrderDetails';
  private cartItemCount = new BehaviorSubject<number>(0);
  currentCartItemCount = this.cartItemCount.asObservable();

  constructor(private http: HttpClient) { }
  // getbla() {
  //   return this.cartItem.length
  // }
  changeCartItemCount(count: number) {
    this.cartItemCount.next(count);
  }

  getShoppingCart(): CartItem[] {
    return this.cartItem;
  }

  PlusQuantity(prodID: number) {
    const cartItem = this.cartItem.find(item => item.productID == prodID);
    if (cartItem) {
      cartItem.quantity++;
      this.cartQuantityChanged.emit(this.getQuantity());
    }
  }

  MinusQuantity(prodID: number) {
    const cartItem = this.cartItem.find(item => item.productID == prodID);
    if (cartItem) {
      cartItem.quantity--;
      if (cartItem.quantity < 1) {
        cartItem.quantity = 1;
      };
      this.cartQuantityChanged.emit(this.getQuantity());
    }

  }

  getPrice(): number {
    var finalPrice = 0;
    this.cartItem.forEach(element => {
      finalPrice += element.FinalPrice();
    });
    return finalPrice;
  }

  getQuantity(): number {
    var total = 0;
    this.cartItem.forEach(element => {
      total += element.quantity;
    });
    
    // this.cartQuantityChanged.emit(this.getQuantity());
    return total;
  }
  availableSizes: { [key: string]: number } = {}; // Đối tượng lưu trữ số lượng kích thước có sẵn

  addToCart(prod: Products, quantity: number, size: string) {
    const product = this.cartItem.find(
      item => item.productID == prod.productId && item.productSize == size);
    if (product == null) {
      if (size == prod.size1 && quantity > prod.amount1) {
        alert("vượt giói hạn")
      }
      this.cartItem.push(new CartItem(prod, quantity, size));
    } else {
      product.quantity += quantity;
    }
    this.cartQuantityChanged.emit(this.getQuantity());


  }
  // checkProductAvailability(productId: number, quantity: number): boolean {
  //   const product = this.productService.getProductByIdAPI(productId); // Lấy thông tin sản phẩm từ cơ sở dữ liệu

  //   if (product && quantity <= product.amount1) {
  //     return true; // Sản phẩm có đủ số lượng
  //   } else {
  //     return false; // Sản phẩm không đủ số lượng
  //   }
  // }
  // updateProductQuantity(productId: number, quantity: number): void {
  //   const product = this.productService.getProductByIdAPI(productId); // Lấy thông tin sản phẩm từ cơ sở dữ liệu
  //   if (product) {
  //     product.quantity -= quantity; // Giảm số lượng sản phẩm sau khi đặt hàng
  //     // Gọi API hoặc cách nào đó để cập nhật số lượng sản phẩm trong cơ sở dữ liệu
  //   }
  // }
  PayMent(order: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Đặt Content-Type là JSON
      }),
    };
    return this.http.post<any>('https://localhost:7069/api/OrderDetails', order);

  }


  DeleteProdCart(prodID: number) {
    // var prod = this.cartItem.find((item) => item.productID == prodID);       
    this.cartItem = this.cartItem.filter(item => item.productID != prodID);
    this.cartQuantityChanged.emit(this.getQuantity());
  }

  ClearCart() {
    this.cartItem = [];
    this.cartQuantityChanged.emit(this.getQuantity());
  }

  PostOrder(order: any) {
    return this.http.post<any>('https://localhost:7069/api/Orders', order)
  }
  PostOrderDetails(orderDetails: any) {
    return this.http.post<any>('https://localhost:7069/api/OrderDetails', orderDetails)
  }
  getOrderedProducts(): any[] {
    const orderedProducts: any[] = [];
    for (const item of this.cartItem) {
      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách orderedProducts chưa
      const existingProduct = orderedProducts.find(
        (orderedItem) =>
          orderedItem.productID === item.productID &&
          orderedItem.productSize === item.productSize
      );

      if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        existingProduct.quantity += item.quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào danh sách orderedProducts
        orderedProducts.push({
          productID: item.productID,
          productName: item.productName,
          productSize: item.productSize,
          quantity: item.quantity,
          // Thêm các thông tin khác của sản phẩm nếu cần
        });
      }
    }
    return orderedProducts;

  }
}
