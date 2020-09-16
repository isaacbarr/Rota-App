import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Store } from "../store";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Shift } from "../models/shift.model";

@Injectable({ providedIn: "root" })
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<any[]> = this.date$.pipe(
    tap((next: any) => this.store.set("date", next))
  );

  private userExists = new BehaviorSubject<boolean>(false);
  currentUserExists = this.userExists.asObservable();

  private userId = new BehaviorSubject<number>(0);
  currentUserId = this.userId.asObservable();


  constructor(private store: Store, private http: HttpClient) {}

  updateDate(date: Date) {
    this.date$.next(date);
  }

  updateUserExists(value: boolean) {
    this.userExists.next(value);
  }

  changeUserId(id: number) {
    this.userId.next(id);
  }

  url = "http://localhost:3000/api/shift/";

  getShifts(date: Date): Observable<Shift[]> {
    return this.http.get<Shift[]>(this.url + date);
  }

  getShiftsById(id: number): Observable<Shift[]> {
    return this.http.get<Shift[]>("http://localhost:3000/api/shift/user/" + id);
  }

  createShift(
    userId: number,
    startTime: string,
    finishTime: string,
    date: string,
    area: string
  ): Observable<any> {
    return this.http.post<any>(this.url + "create", {
      userId,
      startTime,
      finishTime,
      date,
      area,
    });
  }

  getDateRange(id: number, startWeek, endWeek): Observable<Shift[]> {
    return this.http.post<any[]>(this.url + "/date/range/" + id, {
      startWeek,
      endWeek,
    });
  }

  getShiftsForDateRange(startWeek: Date, endWeek: Date): Observable<Shift[]> {
    return this.http.post<Shift[]>(this.url + "/daterange", {
      startWeek,
      endWeek,
    });
  }
  deleteShift(shiftId: number) {
    return this.http.delete(this.url + "/delete/" + shiftId);
  }

  updateShift(
    startTime: string,
    finishTime: string,
    shiftId: number
  ): Observable<Shift[]> {
    return this.http.put<Shift[]>(this.url + "/update/", {
      startTime: startTime,
      finishTime: finishTime,
      shiftId: shiftId,
    });
  }

  approveShift(shiftId : number): Observable<Shift[]> {
    return this.http.put<Shift[]>(this.url + "/approve/" + shiftId, {
      approved: 1,
    });
  }
}
