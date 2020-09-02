import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  userId: number;

  constructor() {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("userId"));
  }
}
