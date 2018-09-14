import { NgModule } from '@angular/core';
import { BlocPipe } from './bloc/bloc';
import { HourPipe } from './hour/hour';
@NgModule({
	declarations: [BlocPipe,
    HourPipe],
	imports: [],
	exports: [BlocPipe,
    HourPipe]
})
export class PipesModule {}
