import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Training } from "../models/user-training.model";

@Injectable({ providedIn: "root" })
export class TrainingService {
  constructor(private http: HttpClient, private router: Router) {}

  url: string = "http://localhost:3000/api/training/";

  getTraining(id: number): Observable<Training[]> {
    return this.http.get<Training[]>(this.url + id);
  }

  insertTrainingArea(id: number, training: string): Observable<Training[]> {
    return this.http.post<Training[]>(this.url + id, {
      training,
    });
  }

  addOtherTrainingArea(
    id: number,
    training: string,
    date: Date
  ): Observable<Training[]> {
    return this.http.post<Training[]>(this.url + id, { training, date });
  }
}
