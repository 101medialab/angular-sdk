import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'default'
})
export default class Default implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return value ? value : args[0] ? args[0] : '';
    }
}
