import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData, Role, StudentData, SubmitStatus } from "./auth-data.model";
import { environment } from "../../environments/environment";
import { UrlConfig } from "../model/url-config";
import { StatusMessage } from '../model/status-message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: Role;

  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<Role>();

  private createStudentListener = new Subject<SubmitStatus>();

  private verifyEmailtListener = new Subject<SubmitStatus>();

  private changePasswordListener = new Subject<SubmitStatus>();

  private dataInitialized = false;
  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getCreateStudentListener() {
    return this.createStudentListener.asObservable();
  }

  getVerifyEmailListener() {
    return this.verifyEmailtListener.asObservable();
  }

  getChangePasswordListener() {
    return this.changePasswordListener.asObservable();
  }

  createUser(
    email: string,
    name: string,
    password: string,
    role: Role,
    nextUrl: string) {
    const authData: AuthData = {
      email: email,
      name: name,
      password: password,
      role: role,
    };
    const url = environment.server + '/api/user/addstaff';
    this.http
      .post(url, authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate([nextUrl || UrlConfig.LIST_DSPS_USERS_ABSOLUTE]);
      });
  }

  createStudentUserStep1(
    email: string,
    name: string,
    password: string,
    collegeId: string,
    cellPhone: string) {
    const studentData: StudentData = {
      email: email,
      name: name,
      password: password,
      collegeId: collegeId,
      cellPhone: cellPhone
    };
    const url = environment.server + '/api/user/addstudentstep1';
    this.http
      .post(url, studentData)
      .subscribe(response => {
        console.log(response);
        this.createStudentListener.next(response as SubmitStatus);
      }, err => {
          console.log(err);
          this.createStudentListener.next({ err: err, message: 'https call encountered an error' });
      });
  }

  verifyEmail(randomKey: string) {

    const url = environment.server + '/api/user/verifyemail';
    this.http
      .post(url, randomKey)
      .subscribe(response => {
        console.log(response);
        this.verifyEmailtListener.next(response as SubmitStatus);
    }, err => {
      console.log(err);
      this.verifyEmailtListener.next({ err: err, message: 'https call encountered an error' });
    });

  }

  checkAndUpdatePassword(oldPassword: string, newPassword: string) {
    const url = environment.server + '/api/user/checkandupdatepassword';
    this.http
      .post(url, {oldPassword: oldPassword, newPassword: newPassword} )
      .subscribe(response => {
        console.log(response);
        this.changePasswordListener.next(response as SubmitStatus);
    }, err => {
      console.log(err);
      this.changePasswordListener.next({ err: err, message: 'https call encountered an error' });
    });
  }

  login(
    email: string,
    password: string,
    nextUrl: string) {

    const authData: AuthData = { email: email, password: password };
    const url = environment.server + '/api/user/login';
    console.log('sending post request to ', url);
    this.http
      .post<{
        token: string; expiresIn: number, userId: string,
        role: Role,
        // isAdmin: boolean, isStaff: boolean, isFaculty: boolean,
        // isStudent: boolean, isInstructor: boolean,
      }>(
        url,
        authData
      )
      .subscribe(response => {
        console.log("response=", response);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          console.log("expiresInDuration=", expiresInDuration);
          this.setAuthTimer(expiresInDuration);

          this.role = response.role;

          this.userId = response.userId;

          
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthDataLocalStorage(
            token,
            expirationDate,
            this.userId,
            this.role,
          );

          this.dataInitialized = true;

          this.triggerAuthChangeEvent();
          this.router.navigate([nextUrl || "/"]);
        }
      });
  }

  // autoAuthUser() {
  //   const authInformation = this.getAuthDataLocalStorage();
  //   if (!authInformation) {
  //     return;
  //   }
  //   const now = new Date();
  //   const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  //   if (expiresIn > 0) {
  //     this.token = authInformation.token;
  //     this.role = authInformation.role;
  //     // this.isAdminAuthenticated = authInformation.isAdminAuthenticated;
  //     // this.isStaffAuthenticated = authInformation.isStaffAuthenticated;
  //     this.userId = authInformation.userId;
  //     this.setAuthTimer(expiresIn / 1000);

  //     this.triggerAuthChangeEvent();
  //   }
  // }

  // send out an auth change event to those listening
  triggerAuthChangeEvent() {
    this.authStatusListener.next(this.role);
  }

  // return current auth
  // refresh from local storage, in case user reloads page
  getRole() {

    this.refreshAuthDataFromLocalStorage();
    return this.role;
  }

  getToken() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    return this.token;
  }

  getIsAdminAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    if (!this.role) {
      return false;
    }
    
    return this.role.isAdmin;
  }

  getIsStaffAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    if (!this.role) {
      return false;
    }

    return this.role.isStaff;
  }

  getIsFacultyAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    if (!this.role) {
      return false;
    }

    return this.role.isFaculty;
  }

  // staff, admin, faculty
  getIsDspsAuth() {

    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    if (!this.role) {
      return false;
    }
    return this.role.isAdmin || this.role.isStaff || this.role.isFaculty;
  }

  getIsStudentAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }

    if (!this.role) {
      return false;
    }

    return this.role.isStudent;
  }

  getIsInstructorAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }

    if (!this.role) {
      return false;
    }

    return this.role.isInstructor;
  }

  getUserId() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    return this.userId;
  }

  clearAuth() {
    this.token = null;
    this.role = null;
    this.triggerAuthChangeEvent();
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthDataLocalStorage();
  }

  logout() {
    this.clearAuth();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(numSeconds: number) {
    console.log("setAuthTimer: setting timer for numSeconds: " + numSeconds);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, numSeconds * 1000);
  }

  private saveAuthDataLocalStorage(
    token: string,
    expirationDate: Date,
    userId: string,
    role: Role
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", JSON.stringify(role));
  }

  private clearAuthDataLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  }

  private getAuthDataLocalStorage() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const roleStr = localStorage.getItem("role");
    const role: Role = JSON.parse(roleStr);

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      role: role
    };
  }

  refreshAuthDataFromLocalStorage() {

    // TODO use expirationDate
    const tmpAuth = this.getAuthDataLocalStorage();
    if (tmpAuth) {
      this.role = tmpAuth.role;
      this.token = tmpAuth.token;
      this.userId = tmpAuth.userId;
    }

    // else do nothing? or initialize to empty/false?

    this.dataInitialized = true; // this will help ensure we don't keep reading from localStorage
  }


}

