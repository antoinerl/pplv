import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrieresPage } from '../pages/prieres/prieres';
import { PrierePage } from '../pages/priere/priere';
import { TemoignagesPage } from '../pages/temoignages/temoignages';
import { CalendarPage } from '../pages/calendar/calendar';
import { CommentPrierPage } from '../pages/comment-prier/comment-prier';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { CalendarModule } from "ion2-calendar";
import { CalendarComponent } from '../components/calendar/calendar'
import { RecurrentMenuComponent } from '../components/recurrent-menu/recurrent-menu'
import { ValidScheduleComponent } from '../components/valid-schedule/valid-schedule'

import {HourPipe} from '../pipes/hour/hour'; 
import {DateformatPipe} from '../pipes/dateformat/dateformat'; 
import {WeekdayPipe} from '../pipes/weekday/weekday'; 

import { APP_CONFIG, AppConfig } from './app.config';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule } from "@angular/common/http";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpProvider } from '../providers/wp/wp';
import { DateProvider } from '../providers/date/date';
import { PrayersProvider } from '../providers/prayers/prayers';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrieresPage,
    PrierePage,
    TemoignagesPage,
    CommentPrierPage,
    CalendarPage,
    LoginPage,
    ProfilePage,
  	CalendarComponent,
  	RecurrentMenuComponent,
    ValidScheduleComponent,
  	HourPipe,
    DateformatPipe,
    WeekdayPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {}, {
     links: [
      { component: HomePage, name: 'Home', segment: 'home' },
      { component: PrieresPage, name: 'prieres', segment: 'prieres' },
      { component: PrierePage, name: 'priere', segment: 'priere/:slug' },
      { component: TemoignagesPage, name: 'temoignages', segment: 'TemoignagesPage' },
      { component: CalendarPage, name: 'calendar', segment: 'calendar/:id/:token/:header' },
      { component: CommentPrierPage, name: 'comment-prier', segment: 'comment-prier' },
      { component: LoginPage, name: 'login', segment: 'login' },
      { component: ProfilePage, name: 'profile', segment: 'profile' }
    ]
  }),

	CalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrieresPage,
    PrierePage,
    TemoignagesPage,
    CommentPrierPage,
    CalendarPage,
    LoginPage,
    ProfilePage,
    CalendarComponent,
    RecurrentMenuComponent,
    ValidScheduleComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HTTP,
    HttpClientModule,
    Network,
    WpProvider,
    { provide: APP_CONFIG, useValue: AppConfig },
    DateProvider,
    PrayersProvider,
    UserProvider,
    UserProvider
  ]
})
export class AppModule {}
