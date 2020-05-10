export class EditedForm {

  _id: string;
  state?: string;
  form?: any;
  formName?: string;
  edited?: boolean;
  user?: string;
  
    constructor(options: {
      _id: string,
      state?: string,
      form?: any,
      formName?: string,
      edited?: boolean,
      user?: string
      })
    {
      this._id = options._id;
      this.state = options.state;
      this.form = options.form || {};
      this.formName = options.formName;
      this.edited = options.edited;
      this.user = options.user;
    }
  
  }