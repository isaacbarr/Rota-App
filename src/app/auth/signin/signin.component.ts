import { NgForm } from "@angular/forms";

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
})
export class SigninComponent implements OnInit {
  isLoading = false;
  error = "";
  userId: number;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    //return if form is invalid
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    //call the method in the auth service and subscribe to
    //observable it returns
    this.authService.login(form.value.email, form.value.password).subscribe(
      (res: any) => {
        //token = response.token
        const token = res.token;
        //user status = response.userStatus
        const userStatus = res.userStatus;
        //user id  = response.userId
        const id = res.userId;
        //update id observable with response id
        this.updateUserId(id);
        //if token check user status
        if (token) {
          //if user status === admin navigate to admin home
          if (userStatus === "admin") {
            this.router.navigate(["/admin"]);
             //if user status === user navigate to user home
          } else if (userStatus === "user") {
            this.router.navigate(["/user"]);
          }
        }
      },
      //show errors if any
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  updateUserId(value: number) {
    this.authService.updateUserId(value);
  }
}
