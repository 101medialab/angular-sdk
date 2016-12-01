import {Pipe, PipeTransform} from '@angular/core';
import {Status} from "../modules/status.svc";

@Pipe({
    name: 'asset'
})
export class Asset implements PipeTransform {
    transform(relativePath: any, args: any[] = null): any {
        return (Status.APP_ENV ? 'http://s3.store.hypebeast.com' : '') + '/media/wiki/' + relativePath;
    }
}
