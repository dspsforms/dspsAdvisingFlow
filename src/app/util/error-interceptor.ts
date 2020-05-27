import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
// import { MatDialog } from "@angular/material";

// import { ErrorComponent } from "./error/error.component";
// import { ErrorService } from "./error/error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // constructor(  private dialog: MatDialog,
  //   private errorService: ErrorService) { }

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
  private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.error && error.error.error.message) {
          errorMessage = error.error.error.message;
        } else if (error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        // this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        // this.errorService.throwError(errorMessage);
        console.log(error);

        if (errorMessage && errorMessage.indexOf('Auth failed. User may not be signed in') >= 0) {
          this.showAuthError(errorMessage);
          // this.router.navigateByUrl('/auth/login');
        } else if (errorMessage && errorMessage.toLowerCase().indexOf('mongo') >= 0) {
          this.showMongoError(errorMessage);
        } else {
          this.showOtherError(errorMessage);
        }
        console.log(error);
        return throwError(error);
      })
    );
  }

  showAuthError(errorMsg) {
    this.alertCtrl.create({
      header: 'You need to login (again)',
      message: errorMsg,
      buttons: [{
        text: 'Okay',
        handler: () => {
          // clear any stale cached auth
          this.authService.clearAuth();
          console.log('routing to /auth/login ');
          this.router.navigateByUrl('/auth/login');
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });
  }

  showMongoError(errorMsg) {
    this.alertCtrl.create({
      header: 'Please ask your IT to check if the database is up, and reachable',
      message: errorMsg,
      buttons: [{
        text: 'Okay',
        handler: () => {
          console.log(errorMsg);
          // check the database connection
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });
  }

  showOtherError(errorMsg) {
    this.alertCtrl.create({
      header: 'Please share a screenshot of this error with your IT contact',
      message: errorMsg,
      buttons: [{
        text: 'Okay',
        handler: () => {
          console.log(errorMsg);
          // need more info to decide what to do
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });
  }
}
