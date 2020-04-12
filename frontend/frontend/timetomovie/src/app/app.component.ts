import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, Nav } from 'ionic-angular';
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

  user: User = new User();;
  // user: any = 
  // {
  //   name: 'Teste',
  //   email: 'usuario@teste.com.br',
  //   local: 
  //     {
  //       estado: 'Rio de Janeiro',
  //       uf: 'RJ'
  //     },
  //   week: 
  //   {
  //     domingo : [],
  //     segunda : ['indisponivel'],
  //     terça : ['07:00|18:00'],
  //     quarta : ['indisponivel'],
  //     quinta : ['indisponivel'],
  //     sexta : ['07:00|18:00'],
  //     sábado : ['13:00|18:00'],
  //   },
  //   hasInterval: false,
  //   interval: null
    
  // }

  constructor(platform: Platform, private menu: MenuController, statusBar: StatusBar, private feedback: FeedBackService, splashScreen: SplashScreen, public storage: Storage, private userService: UserService) {
    this.initializeApp();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  async initializeApp()
  {
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

