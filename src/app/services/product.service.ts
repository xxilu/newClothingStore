import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7069/api/products';


  constructor(private http: HttpClient) { }
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



  getCategoryListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Categories');
  }
  getCategoryIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Categories/' + id.toString());
  }
  postCategory(data: any){
    return this.http.post('https://localhost:7069/api/Categories', data)
  }
  putCategoryAPI(id: number, data: any) {
    return this.http.put('https://localhost:7069/api/Categories/' + id.toString(), data);
  }
  deleteCategoryAPI(id: number) {
    return this.http.delete('https://localhost:7069/api/Categories/' + id.toString());
  }
}
