import { NgModule } from '@angular/core';
import { BlocPipe } from './bloc/bloc';
import { HourPipe } from './hour/hour';
import { DateformatPipe } from './dateformat/dateformat';
import { WeekdayPipe } from './weekday/weekday';
@NgModule({
	declarations: [BlocPipe,
    HourPipe,
    DateformatPipe,
    WeekdayPipe],
	imports: [],
	exports: [BlocPipe,
    HourPipe,
    DateformatPipe,
    WeekdayPipe]
})
export class PipesModule {}
