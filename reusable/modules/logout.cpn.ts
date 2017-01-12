import {Component} from "@angular/core";
import {Router} from "@angular/router";
import Status from "./status.svc";

@Component({
    selector: 'hb-logout',
    template: `
        <a class="btn btn-warning" href="javascript: void(0);" (click)="logout()">Logout</a>
    `
})
export default class LogoutComponent  {
    constructor(private status: Status, private router: Router) {}

    logout() {
        let oldUser = Object.assign({}, this.status.getCurrentUser());

        this.status.reset();

        this.onLoggedOut(oldUser);
    }

    onLoggedOut(oldUser) {
        this.router.navigateByUrl('');
    }
}