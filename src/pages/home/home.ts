import { Component} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    public platform: Platform,
    private storage: Storage) {
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.storage.remove('login');
        this.navCtrl.setRoot(LoginPage)
    });
  }
}
