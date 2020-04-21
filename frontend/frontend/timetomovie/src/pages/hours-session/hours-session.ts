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
  isToday: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private feedback: FeedBackService) {
    this.sessions = this.navParams.get('sessions');
    console.log(this.sessions);
    this.dayUser = this.navParams.get('dayUser');
    this.isToday = this.navParams.get('isToday');
    this.sessions = this.sessions.filter( session => this.filterForHour(session.hour) );
    if( !this.sessions.length )
    {
      this.feedback.alert('Atenção', 'Não há sessões disponíveis para o seu horário livre.');
      this.navCtrl.pop();
    }
    this.sessions = this.sessions.sort( this.sort );
  }

  ionViewDidLoad() {
    //this.feedback.alert('Atenção', 'Se desejar comprar o ingresso, clique em um dos blocos para seguir para a página da ingresso.com')
  }

  goToIngressoCom(url)
  {
    window.open(url, '_blank', '_system');
  }

  sort(dateA, dateB)
  {
    let date = new Date();

    let firstDate = new Date(dateA.date);
    let secoundDate = new Date(dateB.date);

    if((moment(firstDate).diff(secoundDate) < 0))
    {
      return -1;
    }
    else if((moment(firstDate).diff(secoundDate) > 0))
    {
      return 1;
    }

    let firstHour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), dateA.hour.slice(0,2), dateA.hour.slice(3, dateA.hour.length));
    let secoundHour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), dateB.hour.slice(0,2), dateB.hour.slice(3, dateB.hour.length));
    
    if((moment(firstHour).diff(secoundHour) < 0))
    {
      return -1;
    }
    else if((moment(firstHour).diff(secoundHour) > 0))
    {
      return 1;
    }

    return 0;
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
  
      if((moment(initialHour).diff(hourOfTheMovie) <= 0) && 
      (moment(hourOfTheMovie).diff(finalHour) <= 0))
      {
        return false;
      }
    }

    return true;
  }

  movieIsToday(date)
  {
    let d = new Date();
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    let dMovie = new Date(date);
    const dayMovie = dMovie.getDate();
    const monthMovie = dMovie.getMonth();
    const yearMovie = dMovie.getFullYear();

    if((day == dayMovie) && (month == monthMovie) && (year == yearMovie))
    {
      return true;
    }
    return false;
  }

  formatDate(date)
  {
    return moment(date).locale('pt').format('L');
  }

  close()
  {
    this.navCtrl.pop();
  }

}
