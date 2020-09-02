import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./helpers/admin.guard";
import { UserGuard } from "./helpers/user.guard";
import { SigninComponent } from "./auth/signin/signin.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  /* path: '' = index eg localhost:42000
  component is the the component you want
  to load on this route */

  { path: "", component: SigninComponent, pathMatch: "full" },
  { path: "forgotpassword", component: ForgotPasswordComponent, pathMatch: "full" },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((module) => module.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: "user",
    loadChildren: () =>
      import("./user/user.module").then((module) => module.UserModule),
    canActivate: [UserGuard],
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  //this takes our root route config
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard, UserGuard],
})
export class AppRoutingModule {}
