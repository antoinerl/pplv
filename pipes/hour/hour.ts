import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HourPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'hour',
})
export class HourPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(hour: number, ...args) {
		var text = hour + " h";
		if (hour < 10)
			text = "0"+text;
	
    	return text;
  }
}
