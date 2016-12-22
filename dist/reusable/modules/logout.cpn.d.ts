import { Router } from "@angular/router";
import { Status } from "./status.svc";
export declare class LogoutComponent {
    private status;
    private router;
    constructor(status: Status, router: Router);
    logout(): void;
    onLoggedOut(oldUser: any): void;
}
