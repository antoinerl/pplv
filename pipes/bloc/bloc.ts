import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the BlocPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'bloc',
})
export class BlocPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, balise: string) {
    let index1 = value.indexOf("<"+ balise+">");
    let index2 = value.indexOf("</" + balise + ">");
    return value.substr(index1+balise.length+2, index2-index1-balise.length-2);
  }
}
