import { Component } from '@angular/core';
import { AuthPrintService } from './auth/auth-print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dspsmisc-print';

  constructor(private authPrintService: AuthPrintService) {

  }

  onLogout() {
    this.authPrintService.logout();
  }

}


