import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, NavController, MenuController, Nav } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<{title: string, component: any}>;

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    public platform: Platform,
    private storage: Storage,
    public menu: MenuController) {

    this.platform.ready().then(() => {
      this.pages = [
        { title: 'Deudas', component: HomePage },
        { title: 'About Dpto', component: AboutPage }
      ];
    })
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.storage.remove('login');
        this.navCtrl.setRoot(LoginPage)
    });
  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.navCtrl.setRoot(page.component);
  }
}
