import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

//  a smaller version of authService. doesn't actually do login, or createUser. simply
// holds auth info and manages localstorage

@Injectable({
  providedIn: 'root'
})
export class AuthPrintService {

  private user: AuthData; // own Auth data
  private token: string;
  private expirationDate: Date;

  private dataInitialized = false;

  private authStatusListener = new Subject<AuthData>();

  constructor() { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  setAuthLocalStorage(data: any) {

    let d;

    // loggedIn is "yes" or "no", so it always has a value
    // { loggedIn: yes/no, authInfo: { token, user, expirationDate }}
    console.log("data in setAuthLocalStorage", data);
    if (data && data.loggedIn) {
      d = data;
    } else if (data && data.data && data.data.loggedIn) {
      d = data.data;
    }  else {
      console.log("no logedIn field in data");
    }

    console.log(d);
    if (!d) {
      return;
    }

    if (!d.authInfo) {
      // user has logged out
      this.clearAuth();
      return;
    }
    // else d.authInfo is available. save it in own state
    // and own local storage
    this.user = d.authInfo.user;
    this.token = d.authInfo.token;
    this.expirationDate = d.authInfo.expirationDate;

    this.saveAuthDataLocalStorage(this.token, this.expirationDate, this.user);

    this.dataInitialized = true;
  }

  private saveAuthDataLocalStorage(
    token: string,
    expirationDate: Date,
    user: AuthData
  ) {
    if (token) { localStorage.setItem("token", token); }
    if (expirationDate) { localStorage.setItem("expiration", expirationDate.toISOString()); }

    if (user) { localStorage.setItem("user", JSON.stringify(user)); }
  }

  private clearAuthDataLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
    this.dataInitialized = false;
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

  // return current auth
  // refresh from local storage, in case user reloads page
  getRole() {

    this.refreshAuthDataFromLocalStorage();
    if (!this.user || !this.user.role) {
      return null;
    } else {
      return this.user.role;
    };
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
    // this.triggerAuthChangeEvent();
    this.clearAuthDataLocalStorage();
    this.user = null;
    this.dataInitialized = false;
  }

  // send out an auth change event to those listening
  triggerAuthChangeEvent() {
    this.authStatusListener.next(this.user);
  }
}
