import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
    name: string; 
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}

@Injectable()
export class AuthService {
    currentUser: User;

    constructor(private http: Http) {}

    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("please insert credentials");
        } else {
            // return Observable.create(observer => {
            //     this.currentUser = new User('User', 'user@solunes.com');
            //     observer.next(access);
            //     observer.complete();
            // });
            let body = new FormData();
            body.append('email', credentials.email);
            body.append('password', credentials.password);
            return this.http.post('http://dptomanager.solunes.com/api-auth/authenticate', body)
                .map(res => res.json());
        }
    }

    // public register(credentials) {
    //     if (credentials.email === null || credentials.password === null) {
    //         return Observable.throw("Please insert credentials");
    //     } else {
    //         return Observable.create(observer => {
    //             observer.next(true);
    //             observer.complete();
    //         });
    //     }
    // }

    public getUserInfo() : User {
        return this.currentUser;
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }

}
