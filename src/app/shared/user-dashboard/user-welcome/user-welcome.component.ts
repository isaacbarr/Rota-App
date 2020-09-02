import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-user-welcome",
  template: `<div class="container-fluid pt-2">
    <div class="row pt-4 pb-4">
      <div class="col-sm"></div>
      <div class="col-sm-10 text-center" *ngFor="let user of user">
        <h3>Welcome {{ user.name }}</h3>
        <div>
        <p class="text-center"> Check out your upcoming shifts below</p>
      </div>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>`,
})
export class UserWelcomeComponent implements OnInit {
  userId: number;
  user: User[] = [];

  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.employeeService.getEmployeeDetails(this.userId).subscribe(data => {
      this.user = data
    }, error =>{
      console.log(error)
    })
  }
}
