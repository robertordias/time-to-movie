import { Injectable, ViewChild } from "@angular/core";
import { LoadingController, AlertController, Events, Platform, Nav } from "ionic-angular";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Injectable()
export class FeedBackService {

    loading: any;
    @ViewChild(Nav) nav: Nav;

    constructor( private loadingCtrl: LoadingController, private events: Events, private alertCtrl: AlertController, private platform: Platform )
    {

    }

    dismissLoading()
    {
        this.loading.dismiss();
    }

    presentLoading()
    {
		this.loading = this.loadingCtrl.create({
            cssClass: 'loading-ctrl',
            dismissOnPageChange: true
		});
	
		this.loading.present();
    }

    alert(title, message)
    {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [{
              text: 'OK',
              role: 'ok',
              handler: () => {
              }
            }]
          });
          alert.present();
    }
}