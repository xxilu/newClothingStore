import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any
  startDate: string = '';
  endDate: string = '';
  
  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    this.orderService.getOrderListAPI().subscribe(order =>
      this.orders = order.reverse()
    )
  }
  getOrdersByDateRange() {
    this.orderService.getOrdersByDateRange(this.startDate, this.endDate).subscribe((data: any) => {
      this.orders = data;
    });
  }
  // fetchOrdersByDateRange() {
  //   const startDateStr = this.formatDate(this.startDate);
  //   const endDateStr = this.formatDate(this.endDate);
  //   const apiUrl = `YOUR_API_URL?startDate=${startDateStr}&endDate=${endDateStr}`;
  //   this.http.get(apiUrl).subscribe((data: any) => {
  //     this.orders = data; // Gán dữ liệu đơn hàng từ API vào biến orders
  //   });
  // }
  // private formatDate(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }

}
