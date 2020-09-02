import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";

import { Subject, Observable } from 'rxjs';
import { User } from '../models/user.model';




@Injectable({ providedIn: "root" })
export class AdminService {
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router) {}


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/api/users/:id`)

  }
}
