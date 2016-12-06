import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'values'
})
export default class Values implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return !value ? value : Object.keys(value).map(key => value[key]);
    }
}
