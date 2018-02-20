import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../models/product';

@Component({
  selector: 'product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  product = new Product("", "", 0, ""); 
  products: any = [];

  constructor(private db: AngularFireDatabase, private _notificationService: NotificationsService) { }

  ngOnInit() {
    this.products = this.db.list('/products')
  }
  
  onSubmit() {
    this.products.push(this.product).then((item) => {
      this._notificationService.success('Producto agregado', this.product.title)
      this.product = new Product("", "", 0, "");
    })
  }

}
