import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedBackService } from '../../services/feedback-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers: [ FeedBackService, UserService]
})
export class ForgotPasswordPage {

  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private feedback: FeedBackService, private userService: UserService) {
  }

  
  async sendPassword()
  {
    this.feedback.presentLoading();
    if(!this.email)
    {
      this.feedback.dismissLoading();
      this.feedback.alert('Erro', 'Digite seu email para enviar uma senha nova');
      return;
    }

    let res = await this.userService.forgotPassword(this.email);
    if(res.success)
    {
      this.feedback.dismissLoading();
      this.feedback.alert('Email enviado', 'Foi enviado uma nova senha para o e-mail digitado. Verifique também sua caixa de spam');
      return;
    }
    else
    {
      this.feedback.dismissLoading();
      this.feedback.alert('Erro', res.message);;
      return;
    }

  }

}
