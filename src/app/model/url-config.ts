import { FormName } from "./form.util";

export class UrlConfig {
  static NEW_FORM = 'newForm';
  static NEW_FORM_ABSOLUTE = '/newForm';
  static NEW_FORM_ABSOLUTE2 = '/newForm/';

  static SUBMITTED_FORM = 'submittedForm';
  static SUBMITTED_FORM_ABSOLUTE = '/submittedForm';
  static SUBMITTED_FORM_ABSOLUTE2 = '/submittedForm/';

  static BLUESHEET = FormName.BLUESHEET; // 'bluesheet';
  static AAP1 = FormName.AAP1;  // 'aap1';
  static AAP2 = FormName.AAP2;  // 'aap1';

  static ADD_NEW_DSPS_USER = '/auth/add-new-staff';

  // for back buttons, if in doubt, go here
  static DEFAULT_BACK_BUTTON_HREF = '/dsps-staff/form';

  static DEFAULT_BACK_BUTTON_HREF_LIST_USERS = '/dsps-staff/users/list-dsps-users';

  

  static LIST_COLLECTIONS_ABSOLUTE: '/api/forms';

 


  // static SHOW_USERS = 'showUsers';

  // static SHOW_USERS_ABSOLUTE = '/showUsers';


  static LIST_DSPS_USERS = 'dsps-staff/users/list-dsps-users';

  static LIST_DSPS_USERS_ABSOLUTE = '/dsps-staff/users/list-dsps-users';

  static LIST_INSTRUCTORS = 'dsps-staff/users/instructors';
  static LIST_INSTRUCTORS_ABSOLUTE = '/dsps-staff/users/instructors';

  static LIST_STUDENTS = 'dsps-staff/users/students';
  static LIST_STUDENTS_ABSOLUTE = '/dsps-staff/users/students';

  static LIST_FORMS_PRE_ABSOLUTE = '/dsps-staff/form/list/'; // append formName

  static CREATE_FORM_PRE_ABSOLUTE = '/dsps-staff/form/create/'; // append formName 

  // static AGREEMENT_CREATE_EDIT = 'agreementCreateEdit';
  // static AGREEMENT_CREATE_EDIT_ABSOLUTE = '/agreementCreateEdit';
  // static AGREEMENT_CREATE_EDIT_ABSOLUTE2 = '/agreementCreateEdit/';

  // static AGREEMENT_VIEW = 'agreementView';
  // static AGREEMENT_VIEW_ABSOLUTE = '/agreementView';
  // static AGREEMENT_VIEW_ABSOLUTE2 = '/agreementView/';

  static LOGIN = '/auth/login';
  static LOGOUT = '/auth/logout';


}
