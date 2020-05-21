import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HoursSessionPage } from '../hours-session/hours-session';
import { FeedBackService } from '../../services/feedback-service';
import { IngressoComService } from '../../services/ingresso-com-service';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
  providers: [FeedBackService, IngressoComService]
})
export class SessionsPage {
  user: any;
  sessions: any;
  theatherName: string;
  dayOfTheWeek: any;
  initialDate: any = [];
  finalDate:any = [];
  isToday: boolean;
  currentDate: any = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  movies: any;
  dayUser: any = [];
  movieTime: any = [];

  constructor(public navCtrl: NavController, private ingressoComService: IngressoComService, private feedback: FeedBackService, private modalCtrl: ModalController, public navParams: NavParams, public storage: Storage) 
  {
    this.theatherName = this.navParams.get('theatherName');

    this.sessions = this.navParams.get('sessions');
    this.dayOfTheWeek = this.navParams.get('dayOfTheWeek');
    this.isToday = this.navParams.get('isToday');
    // if(this.isToday)
    // {
    //   this.sessions = this.sessions.filter(sessions => (sessions.dayOfWeek == this.dayOfTheWeek) && (sessions.isToday == this.isToday));
    // }
    // else
    // {
    //   this.sessions = this.sessions.filter(sessions => (sessions.dayOfWeek == this.dayOfTheWeek));
    // }

    console.log(this.navParams.get('dayUser'))
    this.navParams.get('dayUser').forEach(data=>{
      this.initialDate.push(data.horario.split("|")[0]);
      this.finalDate.push(data.horario.split("|")[1])
    });

    this.initialDate = this.initialDate.join(', ');
    this.finalDate = this.finalDate.join(', ');
    this.dayUser = this.navParams.get('dayUser');

    // this.sessions.forEach(sess =>{
    //   for(let movie of sess.movies)
    //   {
    //     let rooms = movie.rooms;
    //     for(let room of rooms)
    //     {
    //       for(let session of room.sessions)
    //       {
    //         let dateToCompare = sess.date + ' ' + session.time;
    //         let horarioFilme = new Date(dateToCompare).getHours();
    //         if(this.dayUser.length > 0)
    //         {
    //           for(let inicio_fim of this.dayUser)
    //           {
    //             let inicio = sess.date + ' ' + inicio_fim.split('|')[0];
    //             let fim =  sess.date + ' ' + inicio_fim.split('|')[1];
    //             let horarioIni = new Date(inicio).getHours() - 2;
    //             let horarioFim = new Date(fim).getHours();
    //             if((horarioIni < horarioFilme) && (horarioFilme <= horarioFim))
    //             {
    //               continue;
    //             }
    //             else
    //             {
    //               this.movies.push(movie);
    //               this.movieTime.push(session);
    //             }
  
    //           }
    //         }
    //         else
    //         {
    //           this.movies.push(movie);
    //           this.movieTime.push(session);
    //         }
    //       }
    //     }
    //   }
    // })

    console.log(this.movies)
    console.log(this.movieTime)
  }

  openHoursSession(sessions)
  {
    const modal = this.modalCtrl.create(HoursSessionPage,{
      sessions: sessions,
      dayUser : this.dayUser,
      isToday : this.isToday
    });

    modal.present();
  }

  filterMovie(mov, movie)
  {
    if(mov)
    {
      if(mov.id != movie.id)
      {
        return;
      }
    }
  }

  async ionViewDidLoad() {
    this.user = await this.storage.get('user'); 
    this.feedback.alert('Atenção', 'Devido ao problema atual, esta tela não apresenta dados reais.');
    this.movies = await this.ingressoComService.fakeMoviesByState(this.user.local.uf);
    for(let movie of this.movies)
    {
      movie.sessions.map(session =>{
        if(!session.date)
        {
          session.date = this.currentDate;
        }
      })
    }
  }

}
