import { HttpClient } from "@angular/common/http";
import { Products } from "./product.model";

export class CartItem{

    productID : number;
    productName : string;
    productSize: string;
    imgPath : string;
    quantity:number;
    officialPrice:number;
    // service: ProductService = new ProductService; //thử
    
    constructor(prod: Products, quantity:number, size: string){
        // this.service = new ProductService(new HttpClient);
        
        // var getProd = this.service.getProdById(productID);
        // var getProd = new Products(1,1,"haha",1,2,1,"haha","","","");
        this.productID = prod.productId
        this.productName = prod.productName;
        this.productSize = size
        this.imgPath = prod.imgPath1;
        this.quantity = quantity;
        this.officialPrice = prod.officialPrice;     
    }

    public FinalPrice():number{        
        return this.quantity * this.officialPrice;
    }
}