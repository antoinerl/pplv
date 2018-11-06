import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar';
import { RecurrentMenuComponent } from './recurrent-menu/recurrent-menu';
import { ValidScheduleComponent } from './valid-schedule/valid-schedule';
import { AddToCalendarComponent } from './add-to-calendar/add-to-calendar';
@NgModule({
	declarations: [CalendarComponent,
    RecurrentMenuComponent,
    ValidScheduleComponent,
    AddToCalendarComponent,
    ShareOnFbComponent],
	imports: [],
	exports: [CalendarComponent,
    RecurrentMenuComponent,
    ValidScheduleComponent,
    AddToCalendarComponent]
})
export class ComponentsModule {}
