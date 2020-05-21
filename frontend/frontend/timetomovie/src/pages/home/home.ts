import { Component } from '@angular/core';
import { IngressoComService } from '../../services/ingresso-com-service';
import { Storage } from '@ionic/storage';
import { NavController, AlertController } from 'ionic-angular';
import { TheathersListPage } from '../theathers-list/theathers-list';
import { User } from '../../app/models/User';
import { FeedBackService } from '../../services/feedback-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.html',
  providers: [IngressoComService, FeedBackService]
})
export class HomePage {
  state: any;
  city:any;
  cities: any;
  day: any;
  user: any;
  isToday: boolean = true;

  daysOfTheWeek: any = [{name:'Domingo',code:'domingo'},
   {name:'Segunda', code: 'segunda-feira'},
   {name:'Terça', code:'terça-feira'},
   {name:'Quarta', code:'quarta-feira'},
   {name:'Quinta', code:'quinta-feira'},
   {name:'Sexta', code: 'sexta-feira'},
   {name:'Sábado', code:'sábado'}];

  constructor(public ingressoService: IngressoComService, private feedback: FeedBackService, public storage: Storage, public navCtrl: NavController, public alertCtrl: AlertController) 
  {

  }

  async ionViewWillEnter()
  {
    this.city = await this.storage.get('city');
    let user = await this.storage.get('user');
    this.user = new User(user);

    let data = await this.ingressoService.getCityFromIngressoCom(this.user.local.uf);

    this.state = data;
    this.cities = data.cities;

  }

  validateFields()
  {
    return (this.city && this.day) || (this.city && this.isToday);
  }

  async nextPage()
  {
    try
    {
      this.feedback.presentLoading();
      if(this.isToday)
      {
        let date = new Date().getDay();
        this.dayOfTheWeek(date);
      }
  
      let day = this.day.split('-')[0];
      let dayUser = this.user[day].hour[0].horario;
      if(dayUser == "indisponivel")
      {
        let alert = this.alertCtrl.create({
          title: 'Você não está disponível neste dia!',
          subTitle: 'Escolha outro dia ou altere sua disponibilidade para este dia.',
          buttons: [{
            text: 'OK',
            role: 'ok',
            handler: () => {
            }
          }]
        });
        alert.present();
        this.feedback.dismissLoading();
        return;
      }
  
      let film = await this.ingressoService.getTheatersfromCity(this.city);
      this.storage.set('city', this.city);
      this.navCtrl.push(TheathersListPage,
        {
          user: this.user,
          cityId : this.city,
          cinemas: film,
          dayOfTheWeek: this.day,
          dayUser: this.user[day].hour,
          isToday: this.isToday
        });
    }
    catch(e)
    {
      this.feedback.dismissLoading();
      this.feedback.alert('Erro', 'Verifique sua conexão');
    }
  }


  dayOfTheWeek(day)
  {
    switch(day)
    {
      case 0:
        this.day = 'domingo';
        break;
      case 1:
        this.day = 'segunda-feira';
        break;
      case 2:
        this.day = 'terça-feira';
        break;
      case 3:
        this.day = 'quarta-feira';
        break;
      case 4:
        this.day = 'quinta-feira';
        break;
      case 5:
        this.day = 'sexta-feira';
        break;
      case 6:
        this.day = 'sábado';
        break;

    }
  }


}
