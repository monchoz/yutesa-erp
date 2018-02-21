import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from './../environments/environment';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsListComponent } from './products-list/products-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { OrderNewComponent } from './order-new/order-new.component';

const appRoutes: Routes = [
  { path: "productos", component: ProductsListComponent },
  { path: "productos/nuevo", component: ProductNewComponent },
  { path: "ordenes", component: OrdersListComponent },
  { path: "ordenes/nuevo", component: OrderNewComponent },
  { path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    ProductsListComponent,
    OrdersListComponent,
    ProductNewComponent,
    OrderNewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    ContextMenuModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
