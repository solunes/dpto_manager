import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  template: `<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, private storage: Storage) {
    platform.ready().then(() => {
      this.storage.get('login').then((value) => {
        if(value) {
          this.rootPage = HomePage;
          console.log('home ');
        } else {
          this.rootPage = LoginPage;
          console.log('login');
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
