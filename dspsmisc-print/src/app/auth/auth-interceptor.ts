import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

// import { AuthService } from "./auth.service";
import { AuthPrintService } from './auth-print.service';

// see https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authPrintService: AuthPrintService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authPrintService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
