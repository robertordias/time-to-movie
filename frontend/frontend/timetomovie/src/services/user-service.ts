import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';

import Constants from '../setting.config';
import { User } from '../app/models/User';

@Injectable()
export class UserService {

    header =  new HttpHeaders().set('Access-Control-Allow-Origin' , '*').set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    constructor(private http: Http, private httpClient: HttpClient)
    {

    }

    
    async login(username, password): Promise<any>
    {
        let form = new FormData();

        form.append('username', username);
        form.append('password', password);

        return await this.httpClient.post(Constants.api + 'user/login', form).toPromise();
    }

    async create(user: User):Promise<any>
    {
        return await this.httpClient.post(Constants.api + 'user/create', user, {headers: this.header}).toPromise();
    }

    async findByEmail(username):Promise<User>
    {
        return await this.httpClient.get<User>(Constants.api + 'user/find-by-email/' + username).toPromise();
    }

    async forgotPassword(email):Promise<any>
    {
        let form = new FormData();

        form.append('email', email);
        return await this.httpClient.post(Constants.api + 'user/forgot-password',  form, {headers: this.header}).toPromise();
    }
}