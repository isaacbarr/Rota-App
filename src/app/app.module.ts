//Angular imports
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";

//CSS Framework
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error-interceptor";

//module imports
import { Store } from "./store";
//Component Imports
import { SigninComponent } from "./auth/signin/signin.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { GoogleChartsModule } from 'angular-google-charts';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';


@NgModule({
  declarations: [AppComponent, SigninComponent, PageNotFoundComponent, ForgotPasswordComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    GoogleChartsModule
  ],
  providers: [
    Store,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
