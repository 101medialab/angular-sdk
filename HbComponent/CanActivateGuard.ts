import {Injectable}    from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable}    from 'rxjs/Observable';
import Status from './BaseStatus';

@Injectable()
export default class CanActivateGuard implements CanActivate {
    constructor(
        protected router: Router,
        protected status: Status
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!(this.status.getCurrentUser())) {
            this.status.redirectToOnceLoggedIn = state.url;

            return false;
        }

        return true;
    }
}