import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user-service';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { FeedBackService } from '../services/feedback-service';
import { User } from './models/User';
@Component({
  templateUrl: 'app.html',
  providers: [UserService]
})
export class MyApp {
  rootPage:any;
  
  @ViewChild(Nav) nav: Nav;

  pages: any = [ { title: 'Perfil', component: PerfilPage }, { title: 'Sair', component: LoginPage}];

  user: User = new User();

  constructor(platform: Platform, private menu: MenuController, private events: Events, statusBar: StatusBar, private feedback: FeedBackService, splashScreen: SplashScreen, public storage: Storage, private userService: UserService) {
    this.initializeApp();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.events.subscribe('user', (user) => {
      this.storage.set('user', user);
      this.user = user;
    })

  }

  async initializeApp()
  {
    try{
      this.feedback.presentLoading();
      let userSaved = await this.storage.get('user');
      if(userSaved)
      {
        this.user = await this.userService.findByEmail(userSaved.email);
        if(this.user)
        {
          this.feedback.dismissLoading();
          this.rootPage = HomePage;
          return;
        }
      }
      this.feedback.dismissLoading();
      this.rootPage = LoginPage;
    }catch(e)
    { 
      this.feedback.dismissLoading();
      this.rootPage = LoginPage;
    }
  }

  openPage(p)
  {
    this.menu.close();
    if(p.title == 'Sair')
    {
      this.storage.remove('user');
    }
    this.nav.push(p.component);
  }


}

