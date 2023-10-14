import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  adminLogin: any
  customerLogin:any
  constructor(private authen: AuthenticationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.route.paramMap.subscribe()
    
    this.adminLogin = this.authen.adminLoginState
    this.customerLogin =this.authen.customerLoginState
  }
}
