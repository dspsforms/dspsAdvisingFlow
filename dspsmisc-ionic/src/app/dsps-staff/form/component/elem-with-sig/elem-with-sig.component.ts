import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-elem-with-sig',
  templateUrl: './elem-with-sig.component.html',
  styleUrls: ['./elem-with-sig.component.scss'],
})
export class ElemWithSigComponent implements OnInit {

  @Input() form: FormGroup;

  // name of sub group within form
  @Input() formGroupName: string;

  // name of the formGroup control
  @Input() controlName: string;

  @Input() controlType: 'checkbox' | 'text';

  @Input() label: string;

  @Input() userList: AuthData[];

  // @Input() mode: 'create' | 'view' | 'edit';

  // @Input() refToData;  // a reference so data can be written to it.

  date2Use: Date;

  origValue;
  isCheckbox;

  currentUserId: string;

  constructor(
    private authService: AuthService) { }

  ngOnInit() { 

    // was: on edit or view, this is an object {val: foo, version: number, userId: ..., date: ...}
    // now, it's a scalar
    this.origValue = this.form.get(this.formGroupName).get(this.controlName).value;

    this.isCheckbox = this.controlType === 'checkbox';
  
    this.date2Use = new Date();

    this.currentUserId = this.authService.getUserId();
    
    // console.log("currentUserId from ElemWithSigComponent.ngOnInit()=", this.currentUserId);
    
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
    if (this.isCheckbox) {
      return this.checkboxClickCount % 2 !== 0; // odd true, even false
    } else {
      // origValue may be null. check for both null and empty string
      // let orig = null;
      // let foo = this.form.get(this.formGroupName).get(this.controlName)['latestValueHistory'];
      // if (foo) {
      //   orig = foo.val;
      // } 
      return ! (
        this.origValue === this.form.get(this.formGroupName).get(this.controlName).value)
        // || '' === orig || null === orig)
        ;
    }
  }

  get emptyValue() {
    const val = this.form.get(this.formGroupName).get(this.controlName).value;
    if (this.isCheckbox) {
      return !val;
    } else {
      return !val || val.trim() === '';
    }
    
  }

  get latestValueHistory() {
    return this.form.get(this.formGroupName).get(this.controlName)['latestValueHistory'];
  }

  get lastHistoricalUser() {
    // if there is no value, return nothing
    if (!this.form.get(this.formGroupName).get(this.controlName).value) {
      return null;
    }
    const test = this.form.get(this.formGroupName).get(this.controlName)['latestValueHistory'];
    // console.log("latestValueHistory", test);

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
  checkboxClickCount = 0;

  

  clicked() {
    this.checkboxClickCount++;
    console.log("changeCounter", this.checkboxClickCount);
    console.log(this.form);

  }

  // if the form value has changed since loading, and it's not an empty value
  get edited() {
    let result = null;
    try {
      result= this.form.get(this.formGroupName).get(this.controlName).dirty && this.valueChanged && !this.emptyValue;
    } catch (err) {
      console.log(err);
    }

    return result;
    
  }

}
