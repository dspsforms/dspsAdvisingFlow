import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "../../auth/auth-data.model";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dspsUserList: AuthData[];
  private dspsUserListSmall: AuthData[]; // same as dspsUserList but with smaller data

  private dspsUserListListener = new Subject<AuthData[]>();
  private dspsUserListSmallListener = new Subject<AuthData[]>();

  constructor(private http: HttpClient, private router: Router) { }

  // retrieve list of users -- dsps staff, faculty, and admin only
  // for instructors and students, use separate end point
  listDspsUsers() {

    const url = environment.server + '/api/user/listdsps' ;
    this.http.get<{ message: string, dspsUsers: AuthData[] }>(url)
      .subscribe(res => {
        console.log("listDspsUsers()", res);

        this.dspsUserList = res.dspsUsers;
        this.dspsUserListListener.next([...this.dspsUserList]);

      },
      err => {
        console.log("err", err);
    });
  }

  listDspsUsersSmall() {

    const url = environment.server + '/api/user/listdspssmall' ;
    this.http.get<{ message: string, dspsUsers: AuthData[] }>(url)
      .subscribe(res => {
        console.log("listDspsUsersSmall()", res);

        this.dspsUserListSmall = res.dspsUsers;
        this.dspsUserListSmallListener.next([...this.dspsUserListSmall]);

      },
      err => {
        console.log("err", err);
    });
  }

  getDspsUserListListener() {
    return this.dspsUserListListener.asObservable();
  }

  getDspsUserListSmallListener() {
    return this.dspsUserListSmallListener.asObservable();
  }

  getDspsUserList() {
    return [...this.dspsUserList];
  }

  getDspsUserListSmall() {
    if (this.dspsUserListSmall) {
      return [...this.dspsUserListSmall];
    }
    else return null;
    
  }

}
