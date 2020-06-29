import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SafePipe } from 'src/app/util/safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthPrintService } from '../auth-print.service';



@Component({
  selector: 'app-sub-site-communicator',
  templateUrl: './sub-site-communicator.component.html',
  styleUrls: ['./sub-site-communicator.component.scss']
})
export class SubSiteCommunicatorComponent implements OnInit {

  count = 0;

  debug = false;

  sanitizedAuthServer;

  // safePipe: SafePipe;

  messages = [];
  constructor(
    private sanitizer: DomSanitizer,
    private authPrintService: AuthPrintService) { }

  ngOnInit() {
    // this.authServer = environment.authServer;
    this.sanitizedAuthServer = this.sanitizer.bypassSecurityTrustResourceUrl(environment.authServer);
  }

  @HostListener('window:message', ['$event'])
  onMessage(ev) {
    console.log('sub-site-communicator, received', ev);

    // const m = 'sub-site-communicator. received: ' + JSON.stringify(ev);
    const m = {
      isTrusted: ev.isTrusted,
      origin: ev.origin,
      data: ev.data
      //  JSON.parse(ev.data.data) : null
      // data: ev.data
    };

    // m.data is { token, expirationDate, user}
    this.authPrintService.setAuthLocalStorage(m.data);
    this.messages.push(m);
  }

  requestDataFromMainSiteIframe() {
    const iframe = document.getElementsByTagName('iframe')[0];
    let win;
    // some browser (don't remember which one) throw exception when you try to access
    // contentWindow for the first time, it work when you do that second time
    try {
        win = iframe.contentWindow;
    } catch(e) {
        win = iframe.contentWindow;
    }
    const obj = {
      name: "Fubar",
      count: this.count
    };
    // save obj in subdomain localStorage

    console.log("requesting data. own obj=", obj);
    // win.postMessage(JSON.stringify({key: 'storage', method: 'get', data: obj}), '*');
    win.postMessage({ key: 'storage', method: 'get', data: obj }, '*');

    console.log("request sent");
  }

  onButtonClick() {
    this.count++;
    this.requestDataFromMainSiteIframe();
  }

}
