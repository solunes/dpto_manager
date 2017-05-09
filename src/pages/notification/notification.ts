import { Component, trigger, state, style, animate, transition } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { DatePipe } from '@angular/common';

import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';
/*
  Generated class for the Notification page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
  animations: [
    trigger('itemState', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      //Enter
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-50%)'
        }),
        animate('400ms ease-in-out')
      ]),
    ])
  ]
})
export class NotificationPage {
	title_page = 'Notificaciones';
  notificationsCount: number;
  notifications: Array<any>;

  constructor(public navCtrl: NavController, 
    public storage: Storage,
    private http: HttpClient,
    private loading: LoadingClient,
    public navParams: NavParams) {
      loading.showLoading();
      storage.set('notificationsCount','');

      storage.get('token').then(value => {
        http.get('http://dptomanager.solunes.com/api/notifications', value)
          .map(res => res.json())
          .subscribe(result => {
            console.log(JSON.stringify(result));
            loading.dismiss();
            this.notifications = result.notifications;
        }, error => {
          loading.dismiss();
          console.log("error " + error);
          /*  loading.loading.dismiss().then(() => {
              loading.showError(error);
            });*/
          });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
