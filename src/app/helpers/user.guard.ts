//denys access to routes if user isn't authenticated
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class UserGuard implements CanActivate {
  //get authentication status from auth service
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    //is user authenticated
    const user = this.authService.userValue;
    if (user && user.userStatus === "user") {
      return true;
    } else {
      //not logged, or not a user
      this.router.navigate(["/"]);
    }
    return false;
  }
}
