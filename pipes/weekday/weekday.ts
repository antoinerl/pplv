import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';

/**
 * Generated class for the WeekdayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'weekday',
})
export class WeekdayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let unix = +value;
    return moment(unix*1000).utc().format("dddd");
  }
}
