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
  key_page: string = '/building-content';

  constructor(private auth: AuthService, 
    private http: HttpClient,
    private loading: LoadingClient,
    private storage: Storage) {
    storage.get(this.key_page).then(data_saved => {
      loading.showLoading(data_saved)
      if (data_saved) {
        this.name = data_saved['name']
        this.text = data_saved['text']
      }
      
      http.getRequest(this.key_page, this.loading.loading_page).subscribe(result => {
        this.name = result['name']
        this.text = result['text']
        storage.set(this.key_page, result)
        loading.dismiss()
      }, error => loading.showError(error))
    })
    storage.get('notificationsCount').then(value => {
        this.notificationsCount = value;
    });
  }
}
