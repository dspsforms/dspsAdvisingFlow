import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  constructor() { }

  private loggedIn = true;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  get userIsAuthenticated() {
    return this.loggedIn;
  }
}
