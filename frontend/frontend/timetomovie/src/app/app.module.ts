import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IngressoComService } from '../services/ingresso-com-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import { TheathersListPage } from '../pages/theathers-list/theathers-list';
import { SessionsPage } from '../pages/sessions/sessions';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { PerfilPage } from '../pages/perfil/perfil';
import { HTTP } from '@ionic-native/http';
import { FeedBackService } from '../services/feedback-service';
import { HoursSessionPage } from '../pages/hours-session/hours-session';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TheathersListPage,
    SessionsPage,
    LoginPage,
    SignUpPage,
    PerfilPage,
    HoursSessionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TheathersListPage,
    SessionsPage,
    LoginPage,
    SignUpPage,
    PerfilPage,
    HoursSessionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IngressoComService,
    FeedBackService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HTTP
  ]
})
export class AppModule {}
