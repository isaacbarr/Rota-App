import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UserNavComponent } from "./user-nav/user-nav.component";
import { ProfileModule } from "../shared/profile/profile.module";

@NgModule({
  declarations: [UserComponent, UserNavComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ProfileModule,
    UserRoutingModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
