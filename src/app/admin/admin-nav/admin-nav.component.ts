import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',

})
export class AdminNavComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authService.logOut();
  }
}
