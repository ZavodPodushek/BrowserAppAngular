import {Component, DoCheck, OnInit} from '@angular/core';
import {ConnectServerService} from '../services/connect-server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements DoCheck {
  dataJson: any = false;
  isDisabled = true;

  constructor(private register: ConnectServerService) {
  }

  ngDoCheck() {
    try {
      this.isDisabled = !this.register.checkAdminCookie();
    } catch (e) {
      this.isDisabled = true;
    }
  }

  createAdmin() {
    this.register.createAdminCookie();
  }

  deleteAdmin() {
    this.register.deleteAdminCookie();
  }

  openView() {
    this.register.getLog().subscribe((data: any) => {
      console.log('Success deliver!', data );
      this.dataJson = data.split('\n');
    }, err => {
      console.log(err);
    });
  }

}
