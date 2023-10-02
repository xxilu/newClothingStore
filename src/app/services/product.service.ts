import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7069/api/products';


  constructor(private http: HttpClient) { }
  getProductListAPI(): Observable<any>{
    return this.http.get<any>('https://localhost:7069/api/Products');

  }
  getProductIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Products/' + id.toString());
  }}
