import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {environment} from "../../environments/environment"

import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

import { AuthData } from "../models/auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private userSubject: BehaviorSubject<AuthData>;
  public user: Observable<AuthData>;

  private userId = new BehaviorSubject<number>(0);
  currentUserId = this.userId.asObservable();

  updateUserId(value: number) {
    this.userId.next(value);
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<AuthData>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthData>("http://localhost:3000/api/users/login", {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userId", JSON.stringify(user.userId));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  resetPassword(email: string, name: string, dob: string, password: string) {
    return this.http.put<any>("http://localhost:3000/api/users/resetpassword", {
      email,
      name,
      dob,
      password,
    });
  }

  public get userValue(): AuthData {
    return this.userSubject.value;
  }

  //get token
  getToken() {
    return localStorage.getItem("token");
  }

  //returns userStatus
  getUserStatus() {
    return localStorage.getItem("userStatus");
  }

  getUserId() {
    return localStorage.getItem("userId");
  }
  //returns true if token in local storage therefore user logged in
  getLoggedInStatus() {
    return !!localStorage.getItem("token");
  }


  //log out user - remove everything from storage
  logOut() {
    this.clearAuthData();
    //return to sign in screen
    this.router.navigate(["/"]);
  }

  private clearAuthData() {
    //remove items from local storage
    localStorage.clear();
  }
}



