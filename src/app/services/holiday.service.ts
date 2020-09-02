import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { Holiday } from "../models/user-holiday.model";

@Injectable({ providedIn: "root" })
export class HolidayService {
  private userHoliday = new BehaviorSubject<boolean>(false);
  currentUserHoliday = this.userHoliday.asObservable();

  url = "http://localhost:3000/api/holiday/";

  constructor(private http: HttpClient, private router: Router) {}

  updateUserHoliday(value: boolean) {
    this.userHoliday.next(value);
  }

  getHolidaysForUser(id: number): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.url + id);
  }

  getHolidaysForDate(date: Date): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.url + "/date/" + date);
  }

  createUserHoliday(date: Date, userId: number): Observable<Holiday[]> {
    return this.http.post<Holiday[]>(this.url + "/holiday", {
      date,
      userId,
    });
  }

  deleteHoliday(id: number) {
    return this.http.delete(this.url + id);
  }
}
