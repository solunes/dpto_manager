import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	title_page = 'Acerca del Edificio';
    notificationsCount: number;
	name: string;
	text: string;

  constructor(private auth: AuthService, 
    private http: HttpClient,
    private loading: LoadingClient,
    private storage: Storage) {
  	storage.get('token').then(value => {
  		loading.showLoading();
  		let token = value;
	  	http.get('http://dptomanager.solunes.com/api/building-content', token)
	  		.timeout(3000)
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
  	});
    storage.get('notificationsCount').then(value => {
        this.notificationsCount = value;
    });
  }
}
