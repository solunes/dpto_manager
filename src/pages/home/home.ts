import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController, private auth: AuthService, private storage: Storage) {

  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.storage.remove('login');
        this.nav.setRoot(LoginPage)
    });
  }
}
