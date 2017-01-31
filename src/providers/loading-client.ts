import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController, LoadingController, Loading } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoadingClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadingClient {
	loading: Loading;

  	constructor(public http: Http, 
  		public loadingCtrl: LoadingController, 
  		public toastCtrl: ToastController) {}

  	showLoading(){
		this.loading = this.loadingCtrl.create({
			content: "Please wait..."
		});
		this.loading.present();
	}

	showError(text){
		setTimeout(() => {
			this.loading.dismiss();
		});
		const toast = this.toastCtrl.create({
			message: text,
			showCloseButton: true,
			closeButtonText: 'OK'
		});
		toast.present();
	}

	dismiss(){
		this.loading.dismiss();
	}
}
