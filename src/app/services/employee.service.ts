import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  url = "http://localhost:3000/api/users/";

  constructor(private http: HttpClient) {}

  //get all employee list
  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  //get employee by id
  getEmployee(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.url + id);
  }

  getEmployeeDetails(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.url + "/user/" + id);
  }

  //create a new employee
  createEmployee(userData): Observable<any> {
    return this.http.post<any>(this.url + "create", userData);
  }

  editEmployee(
    name: string,
    email: string,
    phoneNo: number,
    pay: string,
    houseNo: number,
    street: string,
    city: string,
    postcode: string,
    id: number
  ): Observable<User[]> {
    return this.http.put<User[]>(this.url + "/update/" + id, {
      name,
      email,
      phoneNo,
      pay,
      houseNo,
      street,
      city,
      postcode,
    });
  }

  editEmployeeAndRole(
    name: string,
    email: string,
    phoneNo: number,
    pay: string,
    houseNo: number,
    street: string,
    city: string,
    postcode: string,
    userRole: string,
    id: number
  ): Observable<User[]> {
    return this.http.put<User[]>(this.url + "/updateuserandrole/" + id, {
      name,
      email,
      phoneNo,
      pay,
      houseNo,
      street,
      city,
      postcode,
      userRole,
    });
  }

  editEmployeePass(currentPass: string, updatedPass: string, id: number) {
    return this.http.put(this.url + "/password/" + id, {
      currentPass,
      updatedPass,
    });
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + "/delete/" + id);
  }
}
