import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedBackService } from '../../services/feedback-service';
import moment from 'moment'

@Component({
  selector: 'page-hours-session',
  templateUrl: 'hours-session.html',
  providers: [FeedBackService]
})
export class HoursSessionPage {

  sessions:any;
  dayUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private feedback: FeedBackService) {
    this.sessions = this.navParams.get('sessions');
    this.dayUser = this.navParams.get('dayUser');
    this.sessions = this.sessions.filter( session => this.filterForHour(session.hour) );
    console.log(this.sessions);
  }

  ionViewDidLoad() {
    this.feedback.alert('Atenção', 'Se desejar comprar o ingresso, clique em um dos blocos para seguir para a página da ingresso.com')
  }

  goToIngressoCom(url)
  {
    window.open(url, '_blank');
  }

  filterForHour(movieHour)
  {
    if(this.dayUser[0].horario)
    {
      let date = new Date();

      let initial = this.dayUser[0].horario.split('|')[0];
      let final = this.dayUser[0].horario.split('|')[1];
  
      let initialHour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), initial.slice(0,2), initial.slice(3, initial.length))
      let finalHour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), final.slice(0,2), final.slice(3, final.length))
  
      let hourOfTheMovie = new Date(date.getFullYear(), date.getMonth(), date.getDate(), movieHour.slice(0,2), movieHour.slice(3, movieHour.length))
  
      let diff = moment(initialHour).diff(finalHour)
      if((moment(initialHour).diff(hourOfTheMovie) <= 0) && 
      (moment(hourOfTheMovie).diff(finalHour) <= 0))
      {
        return false;
      }
    }

    return true;
  }

  close()
  {
    this.navCtrl.pop();
  }

}
