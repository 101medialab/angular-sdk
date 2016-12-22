// Copied from https://angular.io/docs/ts/latest/guide/router.html#!#can-deactivate-guard

import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

export interface CanComponentDeactivate {
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate(component) : true;
    }
}