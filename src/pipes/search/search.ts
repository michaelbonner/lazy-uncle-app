import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Filters down based on search query
   */
  transform(items: any[], searchQuery: string): any[] {
    if(!items) return [];
    if(!searchQuery) return items;
    searchQuery = searchQuery.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(searchQuery);
    });
  }
}
