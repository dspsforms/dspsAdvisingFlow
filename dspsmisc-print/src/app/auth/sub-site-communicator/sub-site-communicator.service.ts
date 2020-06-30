import { Injectable } from '@angular/core';
import { AuthPrintService } from '../auth-print.service';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class SubSiteCommunicatorService {

  count = 0;
  found = false;

  constructor(
    private authPrintService: AuthPrintService,
    private dialog: MatDialog) { }

  onMessage(ev) {
    console.log('sub-site-communicator, received', ev);

    const authRelatedData = this.extractAuthData(ev.data);

    // const m = 'sub-site-communicator. received: ' + JSON.stringify(ev);
    // const m = {
    //   isTrusted: ev.isTrusted,
    //   origin: ev.origin,
    //   data: ev.data
    //   //  JSON.parse(ev.data.data) : null
    //   // data: ev.data
    // };
    // console.log(m);

    // m.data is { token, expirationDate, user}

    if (authRelatedData) {
      console.log("auth message received", authRelatedData);
      this.found = true;
      this.authPrintService.setAuthLocalStorage(authRelatedData);
    } else {
      console.log("non-auth message. ignored.");
    }

  }

  // if this message is about auth, extract that part. else return null
  extractAuthData(data: any) {
    // the iframe seems to send other messages as well. ignore those here
    let d = null;
    if (data && data.loggedIn) {
      d = data;
    } else if (data && data.data && data.data.loggedIn) {
      d = data.data;
    }  else {
      console.log("no logedIn field in data");
    }

    // console.log(d);
    if (!d) {
      return null;
    } else {
      return d;
    }
  }

    /*
      request data from iframe.
      increase wait time from min to max in 2^n
      try upto M times

    */

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
    // a random object
    const obj = {
      name: "Fubar",
      count: this.count
    };
    // save obj in subdomain localStorage

    console.log("requesting auth-data");
    // win.postMessage(JSON.stringify({key: 'storage', method: 'get', data: obj}), '*');
    win.postMessage({ key: 'storage', method: 'get', data: obj }, '*');

    // console.log("request sent");
  }

  askReceieve() {

    this.found = false;
    const retryParams = {
      maxTries: 100,
      minInterval: 100, // msec
      maxInterval: 3000, // msec
      startIncrement: 100, // msec
    };

    let count = 0;
    let intervalVar = retryParams.minInterval;
    let increment = retryParams.startIncrement;
    this.requestDataFromMainSiteIframe();

    // setInterval seems to have a problem. in any case, the wait time needs to be adjusted

    let maxIntervalReached = false;
    while (!this.found && (count++ < retryParams.maxTries)) {

      setTimeout(() => {
        this.requestDataFromMainSiteIframe();
      }, intervalVar);

      if (!maxIntervalReached) {
        increment = increment * 2;
      }

      if (retryParams.maxInterval - intervalVar < increment) {
        intervalVar = Math.min(intervalVar + increment, retryParams.maxInterval);
        maxIntervalReached = true;
      } else {
        intervalVar += increment;
      }

    }

    let status = null;
    if (!this.found) {
      status =
        "We did not receive your sign-in info from the main server. Please report this to your DSPS admin so we can troubleshoot.";
      console.error("askReceive: did not get auth info from auth-server");
      // this.dialog.open(ErrorComponent,
      //   {
      //     data: {
      //       message: errorMessage
      //     }
      //   });

    }

    return status; // null means success

  }

  callAuthServer() {
    return this.askReceieve();
  }



  // not yet called
  scheduleHeartBeat0() {

    // talk to the auth server every few minutes
    const heartBeatInterval = 5000; // msec

    // this will stop only when the user closes the window
    while (true) {
      setTimeout(() => {
        this.requestDataFromMainSiteIframe();
      }, heartBeatInterval);
    }

  }

}
