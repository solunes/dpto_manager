import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	title_page = 'Acerca del Edificio';
	name: string;
	text: string;

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    private http: HttpClient,
    private loading: LoadingClient,
    private storage: Storage) {
  	storage.get('token').then(value => {
  		loading.showLoading();
  		let token = value;
	  	http.get('http://dptomanager.solunes.com/api/building-content', token)
	  		.map(res => res.json())
	  		.subscribe(allowed => {
	  			console.log("allowed: " + allowed);
	  			loading.dismiss();
	  			this.name = allowed['name'];
	  			this.text = allowed['text'];
	  		}, error => {
	  			console.log("error " + error);
	  			loading.loading.dismiss().then(() => {
		  			loading.showError(error);
	  			});
	  		});
  	})
  }
}
