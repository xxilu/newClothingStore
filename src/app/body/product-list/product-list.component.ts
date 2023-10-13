import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any
  selectedSortOption: string = 'default';
  categoryList: any
  selectedItem: any
  categoryID: any
  // dropdownData: any[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  ngOnInit(): void {

}

}
