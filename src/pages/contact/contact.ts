import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
  	private auth: AuthService, 
    private storage: Storage) {

  }

}
