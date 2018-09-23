import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarPage } from '../pages/calendar/calendar';

import { CalendarModule } from "ion2-calendar";
import { CalendarComponent } from '../components/calendar/calendar'
import { RecurrentMenuComponent } from '../components/recurrent-menu/recurrent-menu'
import { ValidScheduleComponent } from '../components/valid-schedule/valid-schedule'

import {HourPipe} from '../pipes/hour/hour'; 

import { APP_CONFIG, AppConfig } from './app.config';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { HTTP } from '@ionic-native/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpProvider } from '../providers/wp/wp';
import { DateProvider } from '../providers/date/date';
import { PrayersProvider } from '../providers/prayers/prayers';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CalendarPage,
	CalendarComponent,
	RecurrentMenuComponent,
  ValidScheduleComponent,
	HourPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
     links: [
      { component: HomePage, name: 'Home', segment: 'home' },
      { component: ListPage, name: 'my-page', segment: 'some-path/:param' },
      { component: CalendarPage, name: 'calendar', segment: 'calendar/:id/:date/:header' }

    ]
  }),

	CalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CalendarPage,
    CalendarComponent,
    RecurrentMenuComponent,
    ValidScheduleComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HTTP,
    File,
    Network,
    WpProvider,
    { provide: APP_CONFIG, useValue: AppConfig },
    DateProvider,
    PrayersProvider
  ]
})
export class AppModule {}
