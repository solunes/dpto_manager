import { Component} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	title_page = 'Inicio';

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    public platform: Platform,
    private storage: Storage) {}

}
