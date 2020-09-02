import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-user-nav",
  templateUrl: "./user-nav.component.html",
})
export class UserNavComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authService.logOut();
  }
}
