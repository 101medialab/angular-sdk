import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Status } from '../reusable/modules/status.svc';
export declare class CanActivateGuard implements CanActivate {
    protected router: Router;
    protected status: Status;
    protected defaultLoginUrl: string;
    constructor(router: Router, status: Status);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
