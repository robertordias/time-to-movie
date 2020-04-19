import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HoursSessionPage } from '../hours-session/hours-session';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage {
  user: any;
  sessions: any;
  theatherName: string;
  dayOfTheWeek: any;
  initialDate: any = [];
  finalDate:any = [];
  isToday: boolean;
  movies: any = 
  [{
    "title": "Viuva Negra",
    "description": "Em Viúva Negra, após seu nascimento, Natasha Romanoff é dada à KGB, que a prepara para se tornar sua agente definitiva. Quando a URSS rompe, o governo tenta matá-la enquanto a ação se move para a atual Nova York, onde ela trabalha como freelancer. Após aventuras com os Vingadores, ela retorna para seu país de origem e se une à antigos aliados para acabar com o programa governamental que a transformou em uma assassina.",
    "images": [{
      "url": "https://s2.glbimg.com/oG1dNVr1CfN1rbHGGznr9bo_8_Q=/0x0:743x1100/1600x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/d/3/kVHGCoQ8G1yrK5zUkpkg/viuva.jpg"
    }],
    "sessions": [{
      "room": 1,
      "hour": "13:00",
      "subtitled": true,
      "type":"normal",
      "url": "https://www.ingresso.com/"
    },
    {
      "room": 1,
      "hour": "17:00",
      "subtitled": true,
      "type":"normal",
      "url": "https://www.ingresso.com/",
    },
    {
      "room": 2,
      "hour": "15:00",
      "subtitled": false,
      "type":"3D",
      "url": "https://www.ingresso.com/"
    },
    {
      "room": 2,
      "hour": "18:00",
      "subtitled": false,
      "type":"normal",
      "url": "https://www.ingresso.com/"
    }]
  },
  {
    "title": "Um Lugar Silencioso 2",
    "description" : "Um Lugar Silencioso - Parte 2, logo após os acontecimentos mortais, a família Abbott precisa agora encarar o terror mundo afora, continuando a lutar para sobreviver em silêncio. Obrigados a se aventurar pelo desconhecido, eles rapidamente percebem que as criaturas que caçam pelo som não são as únicas ameaças que os observam pelo caminho de areia.",
    "images": [{
      "url": "https://depasecg58tfl.cloudfront.net/wp-content/uploads/2020/02/Um-Lugar-Silencioso-2_cartaz-final-1-1-697x1024.jpg"
    }],
    "sessions": [{
      "room": 1,
      "hour": "14:00",
      "subtitled": true,
      "type":"normal",
      "url": "https://www.ingresso.com/"
    },
    {
      "room": 1,
      "hour": "20:00",
      "subtitled": true,
      "type":"normal",
      "url": "https://www.ingresso.com/"
    },
    {
      "room": 2,
      "hour": "15:30",
      "subtitled": false,
      "type":"3D",
      "url": "https://www.ingresso.com/"
    },
    {
      "room": 2,
      "hour": "17:40",
      "subtitled": false,
      "type":"normal",
      "url": "https://www.ingresso.com/"
    }]
  }];
  dayUser: any = [];
  movieTime: any = [];

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public navParams: NavParams, public storage: Storage) 
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
      dayUser : this.dayUser
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
  }

}
