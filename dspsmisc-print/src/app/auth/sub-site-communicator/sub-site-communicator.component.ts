import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { UrlConfigPrintServer } from 'src/app/model/url-config';
import { SubSiteCommunicatorService } from './sub-site-communicator.service';
import { Subscription, interval } from 'rxjs';



@Component({
  selector: 'app-sub-site-communicator',
  templateUrl: './sub-site-communicator.component.html',
  styleUrls: ['./sub-site-communicator.component.scss']
})
export class SubSiteCommunicatorComponent implements OnInit, OnDestroy {


  sanitizedAuthServerUrl;

  heartBeatSub: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private comService: SubSiteCommunicatorService) { }


  ngOnInit() {
    this.sanitizedAuthServerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.authServer + UrlConfigPrintServer.MAIN_SITE_LOGIN); // '/auth/single-sign-on');

    // talk to the authServer for auth token if user is signed in
    this.comService.callAuthServer();

    // schedule a heartbeat
  }

  @HostListener('window:message', ['$event'])
  onMessage(ev) {
    this.comService.onMessage(ev);
  }


  scheduleHeartBeatRxjs() {

    const heartBeatInterval = 5000; // msec
    const heartBeat = interval(heartBeatInterval);


    this.heartBeatSub = heartBeat.subscribe(foo => {
      this.comService.requestDataFromMainSiteIframe();
    });
  }

  ngOnDestroy() {

  }

}
