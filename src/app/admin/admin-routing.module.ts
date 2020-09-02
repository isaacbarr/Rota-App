import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "../shared/profile/profile.component";

import { AdminComponent } from "./admin.component";
import { EmployeeListComponent } from "./employees/employee-list/employee-list.component";
import { ViewEmployeeComponent } from "./employees/view-employee/view-employee.component";
import { ScheduleComponent } from "./schedule/schedule.component";

import { UserDashboardComponent } from "../shared/user-dashboard/user-dashboard.component";
import { TimeSheetsDashComponent } from "./timesheets/timesheets-dash.component";
import { PayrollReportsComponent} from './payroll-reports/payroll-reports.component'


const routes: Routes = [
  {
    path: "",
    redirectTo: "",
    component: AdminComponent,
    children: [
      //admin home
      { path: "", component: UserDashboardComponent },
      //profile
      { path: "profile", component: ProfileComponent },
      //employees
      { path: "employees", component: EmployeeListComponent },
      { path: "employees/:id", component: ViewEmployeeComponent },
      //rota
      { path: "rota", component: ScheduleComponent },
      //profile
      { path: "profile", component: ProfileComponent },
      //timesheets
      { path: "timesheets", component: TimeSheetsDashComponent },

      //payroll reports
      {path: "reports", component: PayrollReportsComponent },
      //redirect
      { path: "", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  //this takes our root route config
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
