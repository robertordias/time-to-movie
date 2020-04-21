import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Platform } from 'ionic-angular';
import Constants from '../setting.config';

@Injectable()
export class IngressoComService {

  baseUrl: String = 'https://api-content.ingresso.com/v0/';
  header =  new HttpHeaders().set('Access-Control-Allow-Origin' , '*').set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

  constructor(public httpClient: HttpClient, private httpNative: HTTP, private platform: Platform) 
  {

  }

  async getCityFromIngressoCom(UF):Promise<any>
  {
    let url = Constants.api + 'ingresso/states/' + UF;

    let res;
    if(this.platform.is('cordova'))
    {
       let request = await this.httpNative.get(url, {}, { 'Content-Type' : 'application/json'});
       res = request.data ? JSON.parse(request.data) : '';
    }
    else
    {
      res = await this.httpClient.get(url).toPromise()
    }
    
    return res;
  }

  async fakeMoviesByState(state):Promise<any>
  {
    let url = Constants.api + 'ingresso/sessions-fake/' + state;

    let res;
    if(this.platform.is('cordova'))
    {
       let request = await this.httpNative.get(url, {}, { 'Content-Type' : 'application/json'});
       res = request.data ? JSON.parse(request.data) : '';
    }
    else
    {
      res = await this.httpClient.get(url).toPromise()
    }
    
    return res;
  }

  async getTheatersfromCity(cityId):Promise<any>
  {
    let url = Constants.api + 'ingresso/theaters/' + cityId;

    let res;
    if(this.platform.is('cordova'))
    {
       let request = await this.httpNative.get(url, {}, { 'Content-Type' : 'application/json'});
       res = request.data ? JSON.parse(request.data) : '';
    }
    else
    {
      res = await this.httpClient.get(url, {headers: this.header}).toPromise()
    }
    
    return res;
  }

  async getSessionsfromTheather(cityId, theaterId):Promise<any>
  {
    let url = Constants.api + 'ingresso/sessions/' + cityId + '/' + theaterId;

    let res;
    if(this.platform.is('cordova'))
    {
       let request = await this.httpNative.get(url, {}, { 'Content-Type' : 'application/json'});
       res = request.data ? JSON.parse(request.data) : '';
    }
    else
    {
      res = await this.httpClient.get(url, {headers: this.header}).toPromise()
    }
    
    return res;
  }
}
