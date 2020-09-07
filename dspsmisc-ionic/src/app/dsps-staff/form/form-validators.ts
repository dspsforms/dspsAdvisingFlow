import { FormControl } from "@angular/forms";
import { environment } from 'src/environments/environment';

export class FormValidators {

  static collegeIdFormat(control: FormControl) {
    if (!control || !control.value) {
      return null;
    }
    const val: string = control.value;

    // console.log("control", control);

    // console.log("val", val);
    const trimVal = val.trim();
    if (trimVal.length !== 9) {
      return { collegeIdFormat: true };
    }
    // must start with G0
    if (!trimVal.startsWith('G0')) {
      return { collegeIdFormat: true };
    }

    try {
      // skip the first two chars == G0. the rest should be all numeric
      const intVal = parseInt(trimVal.substring(2), 10);
      // is a number. so valid
      return null;
    } catch (err) {
       return { collegeIdFormat: true };
    }
  }

  static validWvmEmail(control: FormControl) {
    // mywvm.wvm.edu

    // during testing, allow creation of non wvm accoounts
    if (!environment.enforceWvmEmail) {
      return null;
    }

     // if no value, let required-check handle it, i.e., return null
    if (!control || !control.value) {
      return null;
    }

    // let Validators.email check for valid email format.

    // check if it ends with mywvm.wvm.edu
    if (!control.value.toLowerCase().match('mywvm.wvm.edu$')) {
     // console.log("not wvm email:", control.value);
      return { validWvmEmail: true };
    }

    return null;
  }


  // https://www.mkyong.com/regular-expressions/how-to-validate-email-address-with-regular-expression/
  static  EMAIL_REG_EX = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
  + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  static isInvalidEmail(control: FormControl) {
      // if no value, let required-check handle it, i.e., return null
    if (!control || !control.value) {
      return null;
    }

    // control.value is not null. it could still be a whitespace.
    if (control.value.match(FormValidators.EMAIL_REG_EX)) {
      return null;
    } else {
      return { isInvalidEmail: true };
    }

  }

 
}
