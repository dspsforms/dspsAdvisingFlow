import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../../../auth/auth.service';
import { AuthData } from '../../../../../.../../../auth/auth-data.model';
import { WrappedForm } from '../../../../../../model/wrapped-form.model';


@Component({
  selector: 'app-extended-time-with-sig',
  templateUrl: './extended-time-with-sig.component.html',
  styleUrls: ['./extended-time-with-sig.component.scss'],
})
export class ExtendedTimeWithSigComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  // name of sub group within form
  @Input() fGroupName: string;

  @Input() userList: AuthData[];

  date2Use: Date;


  controlName = 'extendedTime';

  currentUserId: string;

  labels = {
    na: "N/A",
    oneAndHalfX: "1.5x",
    twoX: "2x",
    threeX: "3x"
  };

  constructor(
    private authService: AuthService) { }

  ngOnInit() {

    this.date2Use = new Date();

    this.currentUserId = this.authService.getUserId();

    console.log("extendedTimeWIthSig currentUserId from ElemWithSigComponent.ngOnInit()=", this.currentUserId);

  }



  get origValue() {

    if (!this.wrappedForm) { return null; }

    // if (this.cName && this.cName === 'adaptedComputer') {
    //   console.log('breakpoint');
    //   console.log(this.wrappedForm);
    // }


    // if (!this.wrappedForm.formWithLatestHistory[this.fGroupName][this.cName]) {
    //   console.log("breakpoint ", this.cName, this.fGroupName);
    // }

    return this.wrappedForm.formWithLatestHistory[this.fGroupName]["extendedTime"].val;
  }

  get txlatedValue() {
    if (this.origValue) { return this.labels[this.origValue]; }
    else { return "N/A"; }
  }

  // try several times
  getUserNameWithDelay(userId: string): string {
    let count = 0;
    let userName = this.getUserName(userId);
    while (!userName && count++ < 100) {
      setTimeout(() => userName = this.getUserName(userId), 2000);
    }

    return userName;
  }

  get currentUserName() {
    return this.getUserNameWithDelay(this.currentUserId);
  }

  getUserName(userId: string) : string {
    if (userId && this.userList && this.userList.length > 0) {
      const user = this.userList.find(u => u && u._id && u._id === userId);
      if (user) {
        return user.name;
      }
    }

    return null;
  }

  get emptyValue() {
    return !this.origValue;

  }

  get latestValueHistory() {
    if (!this.wrappedForm) { return null; }

    return this.wrappedForm.formWithLatestHistory[this.fGroupName]["extendedTime"];

  }



  get lastHistoricalUser() {
    // if there is no value, return nothing
    if (!this.origValue) {
      return null;
    }

    if (!this.latestValueHistory) { return null; }

    const lastHistoricalUserId = this.latestValueHistory.userId;
   // return lastHistoricalUserId;
    if (lastHistoricalUserId) {
      const personName = this.getUserNameWithDelay(lastHistoricalUserId);

      // console.log("userId, lastHistoricalUser=", this.latestValueHistory.userId, personName);
      return personName;
    } else {
      return null;
    }

  }

  get lastHistoricalDate() {
    // if there is no value, return nothing
    if (!this.origValue) {
      return null;
    }

    if (this.latestValueHistory) {
      return this.latestValueHistory.date;
    }  else {
      return null;
    }


  }


}
