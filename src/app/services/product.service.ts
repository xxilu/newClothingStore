import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7069/api/products';
  private selectedCategory: any
  // products: any

  constructor(private http: HttpClient) { }
  // updateQuantityDB(productId: any, selectSize: any, quantity: any) {
  //   const product = this.getProductIdAPI(productId); 
  //   if (productId == product.productId) {
  //     if (selectSize == "S")
  //     {
  //       product.amount1 -= quantity;
  //       console.log(quantity)
  //     }else if(selectSize == "M"){
  //       product.amount2 -= quantity;
  //       console.log(quantity)

  //     }else if(selectSize == "L"){
  //       product.amount2 -= quantity;
  //       console.log(quantity)

  //     }
  //   }
  // }
 

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>('https://localhost:7069/api/Products/' + product.productId.toString(), product);
  }

  setSelectedCategory(categoryId: number) {
    this.selectedCategory = categoryId;
  }

  getSelectedCategory(): number {
    return this.selectedCategory;
  }


  getProductListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Products');

  }
  getProductIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Products/' + id.toString());
  }
  postProductAPI(dataProd: any) {
    return this.http.post('https://localhost:7069/api/Products', dataProd)
  }
  putProductAPI(idProd: number, data: any) {
    return this.http.put('https://localhost:7069/api/Products/' + idProd.toString(), data);
  }
  deleteProductAPI(idProduct: number) {
    return this.http.delete('https://localhost:7069/api/Products/' + idProduct.toString());
  }
  getProductByCate(id: number): Observable<[]> {
    return this.http.get<[]>('https://localhost:7069/api/Categories/category/' + id.toString());
  }
  reduceAmount(id: number, size: string, quantity: number) {
    return this.http.put(`https://localhost:7069/api/Products/api/products/${id}/reduceQuantity?size=${size}&amountToReduce=${quantity}`,null);
  }
  increaseAmount(id: number, size: string, quantity: number) {
    return this.http.put(`https://localhost:7069/api/Products/api/products/${id}/increaseQuantity?size=${size}&amountToIncrease=${quantity}`,null);
  }
  sortProducts(sortOrder: string) {
    return this.http.get<any>('https://localhost:7069/api/Products/sort?sortOrder=' + sortOrder) ;
  }
  filter_input(minPrice: number, maxPrice: number){
    return this.http.get('https://localhost:7069/api/Products/filter_input?minPrice=' + minPrice + '&maxPrice=' + maxPrice)
  }




  getCategoryListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Categories');
  }
  getCategoryIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Categories/' + id.toString());
  }
  postCategory(data: any) {
    return this.http.post('https://localhost:7069/api/Categories', data)
  }
  putCategoryAPI(id: number, data: any) {
    return this.http.put('https://localhost:7069/api/Categories/' + id.toString(), data);
  }
  deleteCategoryAPI(id: number) {
    return this.http.delete('https://localhost:7069/api/Categories/' + id.toString());
  }


  getListProdByOrderIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Products/order/' + id.toString())
  }
  getProdBySearchKeyAPI(searchKey: string): Observable<Products[]> {
    return this.http.get<Products[]>('https://localhost:7069/api/Products/searchKey=' + searchKey);
  }
  getProdAdminBySearchKeyAPI(searchKey: string): Observable<Products[]> {
    return this.http.get<Products[]>('https://localhost:7069/api/Products/searchKeyAdmin=' + searchKey);
  }

  getFavoriteProductAPI(idCus: number): any {
    return this.http.get('https://localhost:7069/api/Products/idFavor=' + idCus.toString);
  }


  getCommentListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Comments');
  }
  getCommentByProductId(id: number): any{
    return this.http.get<any>('https://localhost:7069/api/Comments/productId/' + id.toString());
  }
  getCommentByUserId(id: number): any{
    return this.http.get<any>('https://localhost:7069/api/Comments/userId/' + id.toString());
  }  
  postCommentAPI(dataProd: any) {
    return this.http.post('https://localhost:7069/api/Comments', dataProd)
  }

}
