import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-site-communicator',
  templateUrl: './main-site-communicator.component.html',
  styleUrls: ['./main-site-communicator.component.scss']
})
export class MainSiteCommunicatorComponent implements OnInit {

  num = 0;
  messages = [];

  authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(user => {
        if (!user) {
          // user has logged outs
          // if we have a parent, i.e., we are an iframe, notify them
          // that we are logged out
          if (parent) {
            this.sendToSubSite();
          }
        }
      });
  }

  @HostListener('window:message', ['$event'])
  onMessage(ev) {
    console.log('main-site-communicator. received', ev);

    // const m = 'main-site-communicator. received: ' + JSON.stringify(ev);
    const m = {
      isTrusted: ev.isTrusted,
      origin: ev.origin,
      // data: JSON.parse(ev.data)
      data: ev.data
    } ;
    this.messages.push(m);
    // TODO check if origin is certified to receive a reply
    this.sendToSubSite();
  }

  sendToSubSite() {
    // const iframe = document.getElementsByTagName('iframe')[0];
    // let win;
    // // some browser (don't remember which one) throw exception when you try to access
    // // contentWindow for the first time, it work when you do that second time
    // try {
    //     win = iframe.contentWindow;
    // } catch(e) {
    //     win = iframe.contentWindow;
    // }
    // const obj = {
    //   foo: "Bar",
    //   num: this.num
    // };

    const authInfo = this.authService.getAuthPublicLocalStorage();

    const data2Send = authInfo ? { loggedIn: "yes", authInfo: authInfo }
      : { loggedIn: "no", authInfo: null };

    // send to parent from iframe

    console.log("replying with", authInfo);
    // parent.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), '*');
    parent.postMessage({ key: 'storage', method: 'set', data: data2Send }, '*');

    console.log("done");

    this.num++;
  }

  

}
