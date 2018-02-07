import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * Sorts items by a key
   */
  transform(array: Array<string>, args?: any): Array<string> {

    return array.sort(function(a, b) {
        var x = a[args.sortBy]; 
        var y = b[args.sortBy];
        if( args.descending ){
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }
}
