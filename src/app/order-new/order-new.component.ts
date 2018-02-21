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
  product = new OrderProduct(null, null, null, null);
  selectedProduct: any;
  productsRef: AngularFireList<any>;
  products: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private _notificationService: NotificationsService) { }

  ngOnInit() {
    this.productsRef = this.db.list("/products")
    this.products = this.productsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ value: c.payload.key, label: c.payload.val().title }));
    });
  }
  
  onSubmit() {
    
  }
  
  addProduct() {
    this.product.key = this.selectedProduct.value;
    this.product.title = this.selectedProduct.label;
    
    this.order.products.push(this.product);
    
    this.selectedProduct = null;
    this.product = new OrderProduct(null, null, null, null)
  }

}
