import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrieresPage } from '../pages/prieres/prieres';
import { PrierePage } from '../pages/priere/priere';
import { TemoignagesPage } from '../pages/temoignages/temoignages';
import { CalendarPage } from '../pages/calendar/calendar';
import { PlanningPage } from '../pages/planning/planning';
import { CommentPrierPage } from '../pages/comment-prier/comment-prier';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { CalendarModule } from "ion2-calendar";
import { CalendarComponent } from '../components/calendar/calendar';
import { AddToCalendarComponent } from '../components/add-to-calendar/add-to-calendar';
import { RecurrentMenuComponent } from '../components/recurrent-menu/recurrent-menu'
import { ValidScheduleComponent } from '../components/valid-schedule/valid-schedule'

import {HourPipe} from '../pipes/hour/hour'; 
import {DateformatPipe} from '../pipes/dateformat/dateformat'; 
import {WeekdayPipe} from '../pipes/weekday/weekday'; 

import { APP_CONFIG, AppConfig } from './app.config';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LocalNotifications } from '@ionic-native/local-notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpProvider } from '../providers/wp/wp';
import { DateProvider } from '../providers/date/date';
import { PrayersProvider } from '../providers/prayers/prayers';
import { UserProvider } from '../providers/user/user';
import { InterceptTokenProvider } from '../providers/intercept-token/intercept-token';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrieresPage,
    PrierePage,
    TemoignagesPage,
    CommentPrierPage,
    CalendarPage,
    PlanningPage,
    LoginPage,
    ProfilePage,
  	CalendarComponent,
    AddToCalendarComponent,
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
      { component: TemoignagesPage, name: 'temoignages', segment: 'temoignages' },
      { component: CalendarPage, name: 'calendar', segment: 'calendar/:id/:token/:header' },
      { component: PlanningPage, name: 'planning', segment: 'planning/:id/:token/:header' },
      { component: CommentPrierPage, name: 'comment-prier', segment: 'comment-prier' },
      { component: LoginPage, name: 'login', segment: 'login' },
      { component: ProfilePage, name: 'profile', segment: 'profile/:id/:token/:header' }
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
    PlanningPage,
    LoginPage,
    ProfilePage,
    CalendarComponent,
    RecurrentMenuComponent,
    ValidScheduleComponent,
    AddToCalendarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    Network,
    WpProvider,
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptTokenProvider, multi: true },
    DateProvider,
    PrayersProvider,
    UserProvider,
    UserProvider,
    LocalNotifications
  ]
})
export class AppModule {}
