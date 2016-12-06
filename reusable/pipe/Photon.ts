import {Pipe, PipeTransform} from '@angular/core';
import Status from '../modules/status.svc';

@Pipe({
    name: 'photon'
})
export default class Photon implements PipeTransform {
    transform(path: any, args: any[] = null): any {
        if (!path) {
            return '';
        }

        path = path.replace(/https?:\/\//, '');
        path = path.replace(/[\/]{2,}/, '/');

        let external = path.match(/https?:\/\//, '');

        return Status.APP_ENV ?
            'http://i0.wp.com/' + path + '?' + args :
            (external ? '//' : '') + path;
    }
}
