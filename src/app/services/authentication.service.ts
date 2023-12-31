import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{
  constructor(private http: HttpClient) { }
  customerLoginState: boolean = false//thử
  adminLoginState: boolean = false
  customerInfo: any
  userLogin: any;
  userLoginEmitter: EventEmitter<string> = new EventEmitter<string>()
  customerStated: EventEmitter<boolean> = new EventEmitter<boolean>()
  adminStated: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  getCustomerListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Customers');
  }
  getCustomerIdAPI(id: number): any {
    return this.http.get<any>('https://localhost:7069/api/Customers/' + id.toString());
  }
  LogOut() {
    this.adminLoginState = false
    this.customerLoginState = false
  }

  Register(cus: any) {
    return this.http.post('https://localhost:7069/api/Customers', cus);
  }

  Login(cus: any) {
    this.customerLoginState = true
    // console.log(this.customerStated)
    return this.http.post<any>('https://localhost:7069/api/Customers/signin', cus);
  }
  getCurrentUser(): Customer {
    return this.customerInfo.userId;
  }


  // GetCustomerById(idCus: number): Observable<Customer> {
  //     // return this.http.get<Customer>('https://localhost:7277/api/Customers/' + idCus.toString());
  // }
}
