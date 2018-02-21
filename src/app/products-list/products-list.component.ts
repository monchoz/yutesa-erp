import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';

import { Product } from '../models/product';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  product = new Product("", 0, "");
  productKey = "";
  editProductModal: any;
  productsRef: AngularFireList<any>;
  products: Observable<any[]>;
  listPath = '/products';
  
  @Input() contextMenu: ContextMenuComponent;
  
  constructor(
    private db: AngularFireDatabase,
    private _notificationService: NotificationsService,
    private _modalService: NgbModal,
    private _contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.productsRef = this.db.list(this.listPath)
    this.products = this.productsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  
  onContextMenu($event: MouseEvent, item: any) {
    this._contextMenuService.show.next({
      // Optional - if unspecified, all context menu components will open 
      contextMenu: this.contextMenu,
      event: $event,
      item: item,
    });
    $event.preventDefault();
    $event.stopPropagation();
  }
  
  showModal(editProductModal, item, key) {
    this.product = new Product(item.title, item.stock, item.manufactured);
    this.productKey = key;
    this.editProductModal = this._modalService.open(editProductModal);
  }
  
  removeProduct(productKey, productTitle) {
    this.db.list(this.listPath).remove(productKey).then(_ => {
      this._notificationService.success('Producto eliminado', productTitle)
    })
  }
  
  updateProduct(editProductModal) {
    this.productsRef.update(
      this.productKey,
      {
        title: this.product.title,
        stock: this.product.stock,
        manufactured: this.product.manufactured
      }
    ).then(_ => {
      this.editProductModal.close()
      this._notificationService.success('Producto editado', this.product.title)
    })
  }

}
