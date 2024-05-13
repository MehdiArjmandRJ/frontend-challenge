import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByName',
    standalone: true
})
export class FilterByNamePipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();
        return items.filter(item => {
            return item.name.toLowerCase().includes(searchText);
        });
    }
}