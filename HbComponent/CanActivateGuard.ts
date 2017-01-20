import {Injectable}    from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable}    from 'rxjs/Observable';
import Status from '../reusable/modules/status.svc';

@Injectable()
export class CanActivateGuard implements CanActivate {
    protected defaultLoginUrl = 'login';
    constructor(
        protected router: Router,
        protected status: Status
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!(this.status.getCurrentUser())) {
            this.status.redirectToOnceLoggedIn = state.url;

            this.router.navigateByUrl(this.defaultLoginUrl);

            return false;
        }

        return true;
    }
}