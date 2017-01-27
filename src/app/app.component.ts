import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage: any;

  constructor(platform: Platform, private storage: Storage, public menu: MenuController) {
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
      this.pages = [
        { title: 'Mis Pagos Pendientes', component: AboutPage },
        { title: 'Deudores Morosos', component: ContactPage },
        { title: 'Notificaciones', component: ContactPage },
        { title: 'Historial de Pagos', component: ContactPage },
        { title: 'Acerca del edificio', component: ContactPage }
      ];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    console.log(page);
    this.nav.setRoot(page.component);
  }
}
