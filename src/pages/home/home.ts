import { Component} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { ToolbarComponent } from '../../app/toolbar.component'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ToolbarComponent ]
})
export class HomePage {
	title_page = 'Inicio';

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    public platform: Platform,
    private toolbar: ToolbarComponent,
    private storage: Storage) {}

}
