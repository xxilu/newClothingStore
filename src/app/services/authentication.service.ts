import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  customerLoginState: boolean = false//thử
  adminLoginState: boolean = false
  customerInfo: any

  LogOut() {
      this.adminLoginState = false
      this.customerLoginState = false
  }

  Register(cus: any) {
      return this.http.post('https://localhost:7069/api/Customers', cus);
  }

  Login(cus : any){
      return this.http.post<any>('https://localhost:7069/api/Customers/login', cus);
  }


  // GetCustomerById(idCus: number): Observable<Customer> {
  //     // return this.http.get<Customer>('https://localhost:7277/api/Customers/' + idCus.toString());
  // }

}
