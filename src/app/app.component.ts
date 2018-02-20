import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public options = {
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true
  }
}
