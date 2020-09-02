import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
})
export class ForgotPasswordComponent implements OnInit {
  error: string = "";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  resetPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (form.value.password != form.value.confirmPassword) {
      this.error = "The password are not the same";
    } else {
      this.authService
        .resetPassword(
          form.value.email,
          form.value.fullName,
          form.value.dob,
          form.value.password
        )
        .subscribe(
          (data) => {
            alert("Password reset successfully, returning to sign in page");
            this.router.navigate([""]);
          },
          (error) => {
            this.error = error;
          }
        );
    }


  }
}
