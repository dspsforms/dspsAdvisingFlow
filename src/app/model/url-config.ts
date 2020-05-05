import { FormName } from "./form.util";

export class UrlConfig {
  static NEW_FORM = 'newForm';
  static NEW_FORM_ABSOLUTE = '/newForm';
  static NEW_FORM_ABSOLUTE2 = '/newForm/';

  static SUBMITTED_FORM = 'submittedForm';
  static SUBMITTED_FORM_ABSOLUTE = '/submittedForm';
  static SUBMITTED_FORM_ABSOLUTE2 = '/submittedForm/';

  static BLUESHEET = FormName.BLUESHEET; // 'bluesheet';
  static AAP = FormName.AAP;  // 'aap';
  

  static LIST_COLLECTIONS_ABSOLUTE: '/api/forms';

  static ADD_NEW_STAFF_USER = 'addNewStaffUser';
  static SHOW_USERS = 'showUsers';

  static SHOW_USERS_ABSOLUTE = '/showUsers';

  // static AGREEMENT_CREATE_EDIT = 'agreementCreateEdit';
  // static AGREEMENT_CREATE_EDIT_ABSOLUTE = '/agreementCreateEdit';
  // static AGREEMENT_CREATE_EDIT_ABSOLUTE2 = '/agreementCreateEdit/';

  // static AGREEMENT_VIEW = 'agreementView';
  // static AGREEMENT_VIEW_ABSOLUTE = '/agreementView';
  // static AGREEMENT_VIEW_ABSOLUTE2 = '/agreementView/';

  static LOGIN = 'login';


  static LOGOUT = 'logout';


}
