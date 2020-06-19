import { Component, OnInit, Input, Inject } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { AuthService } from '../../../../auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-elem-with-sig',
  templateUrl: './elem-with-sig.component.html',
  styleUrls: ['./elem-with-sig.component.scss'],
})
export class ElemWithSigComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  // name of sub group within wrappedForm
  @Input() fGroupName: string;

  // name of the control, within fGroupName
  @Input() cName: string;

  @Input() controlType: 'checkbox' | 'text';

  @Input() label: string;

  @Input() userList: AuthData[];

  // @Input() mode: 'create' | 'view' | 'edit';

  // @Input() refToData;  // a reference so data can be written to it.

  date2Use: Date;

  // value;
  isCheckbox;



  constructor() { }

  ngOnInit() {

    // was: on edit or view, this is an object {val: foo, version: number, userId: ..., date: ...}
    // now, it's a scalar
    // this.value = this.wrappedForm.formWithLatestHistory[this.fGroupName][this.cName].value;

    this.isCheckbox = this.controlType === 'checkbox';

    this.date2Use = new Date();

    // console.log("currentUserId from ElemWithSigComponent.ngOnInit()=", this.currentUserId);

  }

  get value() {

    if (!this.wrappedForm) { return null; }

    // if (this.cName && this.cName === 'adaptedComputer') {
    //   console.log('breakpoint');
    //   console.log(this.wrappedForm);
    // }

    return this.wrappedForm.formWithLatestHistory[this.fGroupName][this.cName].val;
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


  getUserName(userId: string) : string {
    if (userId && this.userList && this.userList.length > 0) {
      const user = this.userList.find(u => u._id === userId);
      if (user) {
        return user.name;
      }
    }

    return null;
  }


  get latestValueHistory() {
    if (!this.wrappedForm) { return null; }

    return this.wrappedForm.formWithLatestHistory[this.fGroupName][this.cName];

  }

  get lastHistoricalUser() {
    // if there is no value, return nothing
    if (!this.value) {
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
    if (!this.value) {
      return null;
    }

    if (this.latestValueHistory) {
      return this.latestValueHistory.date;
    }  else {
      return null;
    }


  }


}
