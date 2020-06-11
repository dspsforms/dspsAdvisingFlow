import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';


@Component({
  selector: 'app-extended-time-with-sig',
  templateUrl: './extended-time-with-sig.component.html',
  styleUrls: ['./extended-time-with-sig.component.scss'],
})
export class ExtendedTimeWithSigComponent implements OnInit {

  @Input() form: FormGroup;

  // name of sub group within form
  @Input() formGroupName: string;

  @Input() userList: AuthData[];

  date2Use: Date;

  origValue;
  controlName = 'extendedTime';

  currentUserId: string;

  constructor(
    private authService: AuthService) { }

  ngOnInit() { 

    // this is a scalar
    this.origValue = this.form.get(this.formGroupName).get(this.controlName).value;

    this.date2Use = new Date();

    this.currentUserId = this.authService.getUserId();
    
    console.log("extendedTimeWIthSig currentUserId from ElemWithSigComponent.ngOnInit()=", this.currentUserId);
    
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
      const user = this.userList.find(user => user._id === userId);
      if (user) {
        return user.name;
      }    
    }

    return null;  
  }

  get valueChanged() {
      return this.radioClickCount  % 2 !== 0; // odd true, even false
  }

  get emptyValue() {
    const val = this.form.get(this.formGroupName).get(this.controlName).value;
    return !val;
    
  }

  get latestValueHistory() {
    return this.form.get(this.formGroupName).get(this.controlName)['latestValueHistory'];
  }

  get lastHistoricalUser() {
    // if there is no value, return nothing
    if (!this.form.get(this.formGroupName).get(this.controlName).value) {
      return null;
    }
    const lastHistoricalUserId = this.latestValueHistory.userId;
   // return lastHistoricalUserId;
    if (lastHistoricalUserId) {
      const personName = this.getUserNameWithDelay(lastHistoricalUserId);
      //  console.log("extendedTimeWIthSig: userId, lastHistoricalUser=", this.latestValueHistory.userId, personName);
      return personName;
    } else {
      return null;
    }
    
  }

  get lastHistoricalDate() {
    // if there is no value, return nothing
    if (!this.form.get(this.formGroupName).get(this.controlName).value) {
      return null;
    }

    if (this.latestValueHistory) {
      return this.latestValueHistory.date;
    }  else {
      return null;
    }
    
    
  }

  // if this is even, value is same as orig value (for checkbox)
  radioClickCount  = 0;

  

  onChangeHandler(event) {
    this.radioClickCount ++;
    console.log("radioChangeCounter", this.radioClickCount );
    console.log(this.form);

  }

  // for ion-radio, even if the corresponding formControl is disabled, the ion-radio is not. 
  get isDisabled() {
    return this.form.get(this.formGroupName).get(this.controlName).disabled;
  }

}
