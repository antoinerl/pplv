import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar';
import { RecurrentMenuComponent } from './recurrent-menu/recurrent-menu';
import { ValidScheduleComponent } from './valid-schedule/valid-schedule';
@NgModule({
	declarations: [CalendarComponent,
    RecurrentMenuComponent,
    ValidScheduleComponent],
	imports: [],
	exports: [CalendarComponent,
    RecurrentMenuComponent,
    ValidScheduleComponent]
})
export class ComponentsModule {}
