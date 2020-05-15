export class EditedForm {

  _id: string;
  state?: string;
  form?: any;
  versionHistory?: {};
  currentVersion?: number;
  formName?: string;
  edited?: boolean;
  user?: string;
  
    constructor(options: {
      _id: string,
      state?: string,
      form?: any,
      versionHistory?: {},
      currentVersion?: number,
      formName?: string,
      edited?: boolean,
      user?: string
      })
    {
      this._id = options._id;
      this.state = options.state;
      this.form = options.form || {};
      this.versionHistory = options.versionHistory || {};

      // when created, version was 1, so min val on edit is 2
      this.currentVersion = options.currentVersion || 2; 
      this.formName = options.formName;
      this.edited = options.edited;
      this.user = options.user;
    }
  
  }