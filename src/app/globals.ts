import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController} from 'ionic-angular';
import { AuthService } from '../providers/auth-service';
import { LoginPage } from '../pages/login/login';

@Injectable()
export class Globals {
	logoutButton = '<button ion-button (click)="globals.logout()"><ion-icon name="log-out"></ion-icon></button>';
	constructor(){
	}

	public logout(navCtrl: NavController, auth: AuthService, storage: Storage) {
    	auth.logout().subscribe(succ => {
        storage.remove('login');
        navCtrl.setRoot(LoginPage)
    });
  }
}
