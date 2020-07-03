import { Component } from '@angular/core';
import { AuthPrintService } from './auth/auth-print.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dspsmisc-print';


  constructor(private authPrintService: AuthPrintService) {

  }

  get sameSite() {
    return environment.sameSite;
  }

  onLogout() {
    this.authPrintService.logout();
  }

}


