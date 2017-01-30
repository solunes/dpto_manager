import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	title_page = 'Acerca del Edificio';

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    private storage: Storage) {

  }
}
