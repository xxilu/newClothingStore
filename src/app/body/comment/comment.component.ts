// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductService } from 'src/app/services/product.service';

// @Component({
//   selector: 'app-comment',
//   templateUrl: './comment.component.html',
//   styleUrls: ['./comment.component.css']
// })
// export class CommentComponent implements OnInit{
//   constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute){}
//   ngOnInit(): void {
    
//   }
//   CreateComment(f: NgForm) {
//     if (f.value.getCurrentUser()
//       //  &&  f.value.price != '' && f.value.amount != '' && f.value.productIntroduction != '' 
//     ) {
//       const data = {
//         userId: f.value.getCurrentUser(),
//         productId: f.value.CreatedDate,
//         content: Number(f.value.officialPrice),
//         date: Number(f.value.initialPrice),
//       }
//       console.log(data)

//       this.productService.postCommentAPI(data).subscribe()
//       alert('Thêm bình luận thành công')
//       // console.log('sau thêm', this.selectedSizeS)

//       this.router.navigate(['/products']);
//     }
//     else {
//       // this.notification = "Vui lòng nhập đầy đủ thông tin"
//       console.log("deo dc")
//     }
//   }
// }


// }
