import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData, Role, StudentData, SubmitStatus, UserFromRandomKey } from "./auth-data.model";
import { environment } from "../../environments/environment";
import { UrlConfig } from "../model/url-config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private role: Role;
  // private userId: string;

  private user: AuthData; // own Auth data
  private token: string;
  private tokenTimer: any;



  private authStatusListener = new Subject<AuthData>();

  private createStudentListener = new Subject<SubmitStatus>();

  private verifyEmailtListener = new Subject<SubmitStatus>();

  private changePasswordListener = new Subject<SubmitStatus>();

  private resetPasswordStep1Listener = new Subject<SubmitStatus>();
  private retrieveUserFromRandomKeyListener = new Subject<UserFromRandomKey>();

  private resetPasswordStep2Listener = new Subject<SubmitStatus>();

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

  getResetPasswordStep1Listener() {
    return this.resetPasswordStep1Listener.asObservable();
  }

  getRetrieveUserFromRandomKeyListener() {
    return this.retrieveUserFromRandomKeyListener.asObservable();
  }

  getResetPasswordStep2Listener() {
    return this.resetPasswordStep2Listener.asObservable();
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
      .post(url, { key: randomKey })
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

  resetPasswordStep1(email: string) {
    const url = environment.server + '/api/user/resetpasswordstep1';
    this.http
      .post(url, {email: email} )
      .subscribe(response => {
        console.log(response);
        this.resetPasswordStep1Listener.next(response as SubmitStatus);
    }, err => {
      console.log(err);
      this.resetPasswordStep1Listener.next({ err: err, message: 'https call encountered an error' });
    });
  }

  // part of reset password
  retrieveUserFromRandomKey(randomKey: string) {

    const url = environment.server + '/api/user/retrieveuserfromrandomkey';
    this.http
      .post(url, { key: randomKey })
      .subscribe(response => {
        console.log(response);
        /*
        response looks like this:
        { user: u,  // type AuthData, has u.email
          emailInRandomKeyReq: email2,
          err: e  // if there is an error

        }
        */
        const updatedResponse = response as UserFromRandomKey;
        updatedResponse.key = randomKey;
        this.retrieveUserFromRandomKeyListener.next(updatedResponse as UserFromRandomKey);
    }, err => {
      console.log(err);
      this.retrieveUserFromRandomKeyListener.next({ err: err, message: 'https call encountered an error' });
    });

  }

  resetPasswordStep2(email: string, password: string, key: string) {
    const url = environment.server + '/api/user/resetpasswordstep2';
    this.http
      .post(url, {email: email, password: password, key: key} )
      .subscribe(response => {
        console.log(response);
        this.resetPasswordStep2Listener.next(response as SubmitStatus);
    }, err => {
      console.log(err);
      this.resetPasswordStep2Listener.next({ err: err, message: 'https call encountered an error' });
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
        token: string;
        expiresIn: number,
        email: string,
        userId: string,
        role: Role,
        name: string,
        isAdmin: boolean,
        isStaff: boolean,
        isFaculty: boolean,
        isInstructor: boolean,
        isStudent: boolean,
        collegeId: string
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

          const userTmp = new AuthData(
            response.email,
            null, // password
            response.role,
            response.name,
            null, // created
            null, // lastNod
            null, // cellPhone
            response.collegeId,
            response.userId
          );

          this.user = userTmp;


          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthDataLocalStorage(
            token,
            expirationDate,
            this.user
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
  //     this.user = authInformation.user;
  //     // this.isAdminAuthenticated = authInformation.isAdminAuthenticated;
  //     // this.isStaffAuthenticated = authInformation.isStaffAuthenticated;
  //     this.setAuthTimer(expiresIn / 1000);

  //     this.triggerAuthChangeEvent();
  //   }
  // }

  // send out an auth change event to those listening
  triggerAuthChangeEvent() {
    this.authStatusListener.next(this.user);
  }

  // return current auth
  // refresh from local storage, in case user reloads page
  getRole() {

    this.refreshAuthDataFromLocalStorage();
    if (!this.user || !this.user.role) {
      return null;
    } else {
      return this.user.role;
    }
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
    if (!this.user || !this.user.role) {
      return false;
    }

    return this.user.role.isAdmin;
  }

  getIsStaffAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    if (!this.user || !this.user.role) {
      return false;
    }

    return this.user.role.isStaff;
  }

  getIsFacultyAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    if (!this.user || !this.user.role) {
      return false;
    }

    return this.user.role.isFaculty;
  }

  // staff, admin, faculty
  getIsDspsAuth() {

    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    if (!this.user || !this.user.role) {
      return false;
    }
    return this.user.role.isAdmin || this.user.role.isStaff || this.user.role.isFaculty;
  }

  getIsStudentAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }

    if (!this.user || !this.user.role) {
      return false;
    }

    return this.user.role.isStudent;
  }

  getIsInstructorAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }

    if (!this.user || !this.user.role) {
      return false;
    }

    return this.user.role.isInstructor;
  }

  getUserId() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    return this.user._id;
  }

  getUser() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    return this.user;
  }

  clearAuth() {
    this.token = null;
    this.triggerAuthChangeEvent();
    clearTimeout(this.tokenTimer);
    this.clearAuthDataLocalStorage();
    this.user = null;
    this.dataInitialized = false;
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
    user: AuthData
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("user", JSON.stringify(user));
  }

  private clearAuthDataLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
  }

  private getAuthDataLocalStorage() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userStr = localStorage.getItem("user");
    const user: AuthData = JSON.parse(userStr);

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user: user
    };
  }

  refreshAuthDataFromLocalStorage() {

    // TODO use expirationDate
    const tmpAuth = this.getAuthDataLocalStorage();
    if (tmpAuth) {
      this.token = tmpAuth.token;
      this.user = tmpAuth.user;
    }

    // else do nothing? or initialize to empty/false?

    this.dataInitialized = true; // this will help ensure we don't keep reading from localStorage
  }


}

