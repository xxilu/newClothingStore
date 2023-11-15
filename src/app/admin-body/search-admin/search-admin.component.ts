import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-admin',
  templateUrl: './search-admin.component.html',
  styleUrls: ['./search-admin.component.css']
})
export class SearchAdminComponent {
  lstProd: Products[] = [];
  search_key = "";
  searchTitleHead = "";
  constructor(private productService:ProductService, private route: ActivatedRoute){ }
  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.search_key = this.route.snapshot.params['search_key'];
      this.searchTitleHead = "Kết quả tìm kiếm cho " +'"'+this.search_key+'"';
      this.productService.getProdBySearchKeyAPI(this.search_key).subscribe(lstProd => 
        this.lstProd = lstProd
        )
    })
  }
}
