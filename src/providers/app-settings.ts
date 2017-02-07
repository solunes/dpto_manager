import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const CONFIG = {
	apiUrl: 'http://dptomanager.solunes.com'
};

@Injectable()
export class AppSettings {

  constructor() {
  }

  public getApiUrl(){
  	return CONFIG.apiUrl;
  }

}
