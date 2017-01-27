import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { MenuController, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  	loginStatus: boolean = false;
	loading: Loading;
	registerCredentials = {email: '', password: ''};

	constructor(private nav: NavController, 
		private auth: AuthService, 
		private alertCtrl: AlertController, 
		private loadingCtrl: LoadingController, 
		private storage: Storage,
		private menu: MenuController,
		private http: Http) {

		this.menu.enable(false);
	}

	public login(){
		this.showLoading();
		this.auth.login(this.registerCredentials).subscribe(allowed => {
			if (allowed) {
				setTimeout(() => {
					this.loading.dismiss();
					this.nav.setRoot(HomePage);
					this.storage.set('login', true);
				});
			} else {
				this.showError("Access Denied");
			}
		}, error => {
			this.showError(error);
		});
	}

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
		let alert = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}

  	ionViewWillLeave(){
  		this.menu.enable(true);
  	}
}
