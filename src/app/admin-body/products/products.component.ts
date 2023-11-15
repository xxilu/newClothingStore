import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  lstProduct:any;
  constructor(private productService : ProductService, private router: Router){}
  ngOnInit(): void {
    this.productService.getProductListAPI().subscribe(lstProd => 
        this.lstProduct = lstProd.reverse()
      )
  }
  SearchSubmit(form: NgForm) {
    // alert(form.value.search_string);
    const searchString = form.value.search_string;
    console.log(searchString);

    form.reset();
    this.router.navigate(['/searchAdmin', searchString]);

  }
}
