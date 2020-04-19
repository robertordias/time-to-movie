import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SessionsPage } from '../sessions/sessions';
import { IngressoComService } from '../../services/ingresso-com-service';
import { FeedBackService } from '../../services/feedback-service';


@Component({
  selector: 'page-theathers-list',
  templateUrl: 'theathers-list.html',
  providers: [IngressoComService, FeedBackService]
})
export class TheathersListPage {

  cinemas: any
  cinemasCount: number;
  imageCine: any;
  cityId: any;
  dayOfTheWeek: any;
  dayUser: string;
  isToday: boolean;

  constructor(public ingressoService: IngressoComService, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private feedback: FeedBackService) 
  {
    this.cinemas = this.navParams.get('cinemas').items;
    this.cityId = this.navParams.get('cityId');
    this.cinemasCount = this.navParams.get('cinemas').count;
    this.dayOfTheWeek = this.navParams.get('dayOfTheWeek');
    this.dayUser = this.navParams.get('dayUser');
    this.isToday = this.navParams.get('isToday');
  }

  async getSessions(theatherId, theatherName)
  {
    let sessions = await this.ingressoService.getSessionsfromTheather(this.cityId, theatherId);
    // if(!sessions || !sessions.data)
    // {
    //   this.feedback.alert('Atenção', 'Não há sessões disponíveis para esse cinema');
    //   return;
    // }
    
    this.navCtrl.push(SessionsPage,{
      sessions : sessions,
      dayOfTheWeek: this.dayOfTheWeek,
      theatherName : theatherName,
      dayUser: this.dayUser,
      isToday: this.isToday
    });
  }

  ionViewDidLoad() {
    let hasCinema = this.cinemas.filter( cine => cine.enabled ).length;
    if(!this.cinemas.length)
    {
      this.feedback.alert('Atenção', 'Não há cinemas disponíveis para essa cidade');
      this.navCtrl.pop();
    }
    // if(!hasCinema)
    // {
    //   this.feedback.alert('Atenção', this.cinemas[0].blockMessage);
    //   this.navCtrl.pop();
    // }
  }

}
