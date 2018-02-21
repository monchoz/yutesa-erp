import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotificationsService } from 'angular2-notifications';

import { Order } from '../models/order';

@Component({
  selector: 'order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {
  order = new Order("", "", [])

  constructor(private db: AngularFireDatabase, private _notificationService: NotificationsService) { }

  ngOnInit() {
  }
  
  onSubmit() {
    
  }

}
