//denys access to routes if user doesn't have admin status
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
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
    //set user to user observable
    const user = this.authService.userValue;
    //if user exists and status === admin allow access
    if (user && user.userStatus === "admin") {
      return true;
    } else {
      //not logged, or not an admin
      this.router.navigate(["/"]);
    }
    return false;
  }
}
