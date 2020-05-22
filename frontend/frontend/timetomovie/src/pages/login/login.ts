import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { FeedBackService } from '../../services/feedback-service';
import { UserService } from '../../services/user-service';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';
import { User } from '../../app/models/User';
import { Storage } from '@ionic/storage';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService, FeedBackService]
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, private events: Events, public navParams: NavParams, private storage: Storage, private feedback: FeedBackService, private userService: UserService, private app: App) {
  }

  signUp()
  {
    this.feedback.presentLoading();
    this.navCtrl.push(SignUpPage);
  }

  forgotPassword()
  {
    this.navCtrl.push(ForgotPasswordPage);
  }

  async login()
  {
    this.feedback.presentLoading();
    if(!this.username)
    {
      this.feedback.dismissLoading();
      this.feedback.alert("Preencha seu usuário.", "O campo usuário não pode ficar vazio");
      return;
    }
    if(!this.password)
    {
      this.feedback.dismissLoading();
      this.feedback.alert("Preencha sua senha.", "O campo senha não pode ficar vazio");
      return;
    }

      this.userService.login(this.username, this.password).then( async res =>{

        if(res.success)
        {
          let user = await this.userService.findByEmail(this.username);
          this.storage.set('user', new User(user));
          this.events.publish('user', user);
          console.log(new User(user))
          var nav = this.app.getRootNav();
          nav.setRoot(HomePage);
        }
        else
        {
          this.feedback.dismissLoading();
          this.feedback.alert('Erro', res.message);
        }

      }).catch(e=>{
        this.feedback.dismissLoading();
        this.feedback.alert("Erro", "Verifique sua conexão");
      });
      
  }

}
