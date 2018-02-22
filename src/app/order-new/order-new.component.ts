import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';

import { Order } from '../models/order';
import { OrderProduct } from '../models/order-product';

@Component({
  selector: 'order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {
  order = new Order("", "", []);
  product = new OrderProduct(null, null, null, null, null);
  selectedProduct: any;
  productsRef: AngularFireList<any>;
  products: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private _notificationService: NotificationsService) { }

  ngOnInit() {
    this.productsRef = this.db.list("/products")
    this.products = this.productsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ value: c.payload.key, label: c.payload.val().title, stock: c.payload.val().stock }));
    });
  }
  
  onSubmit() {
    let self = this;
    this.db.list('/orders').push(this.order).then((item) => {
      this._notificationService.success('Orden creada', this.order.customer)
      this.order.products.forEach(function(orderProduct) {
        let newStock = orderProduct.stock - orderProduct.quantity;
        self.productsRef.update(
          orderProduct.key,
          {
            stock: newStock
          }
        )
      })
      this.order = new Order("", "", []);
      this.product = new OrderProduct(null, null, null, null, null);
    })
  }
  
  addProduct() {
    this.product.key = this.selectedProduct.value;
    this.product.title = this.selectedProduct.label;
    this.product.stock = this.selectedProduct.stock;
    
    this.order.products.push(this.product);
    
    this.selectedProduct = null;
    this.product = new OrderProduct(null, null, null, null, null);
  }
  
  removeOrderProduct(productKey) {
    this.order.products.splice(this.order.products.findIndex(e => e.key === productKey),1);
  }

}
