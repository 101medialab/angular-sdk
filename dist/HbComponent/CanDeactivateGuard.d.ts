import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
export interface CanComponentDeactivate {
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean;
}
export declare class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean;
}
