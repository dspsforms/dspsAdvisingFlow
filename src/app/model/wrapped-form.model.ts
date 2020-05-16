import { VersionDetail } from './saved-form.model';

export class WrappedForm {

  formKey?: string;
  _id?: string;
  form?: {};
  state?: string;
  formName?: string;
  user?: string;
  formHistory?: {};
  versionDetails?: VersionDetail[];
  currentVersion?: number;
  
  constructor(options: {
    formKey?: string,
    _id?: string,
    form?: any,
    state?: string,
    formName?: string,
    user?: string,
    formHistory?: {},
    versionDetails?: VersionDetail[],
    currentVersion?: number          
  })
  {
    this.formKey = options.formKey;
    this._id = options._id;
    this.form = options.form || {};
    this.state = options.state;
    this.formName = options.formName;
    this.user = options.user;
    this.formHistory = options.formHistory;
    this.versionDetails = options.versionDetails;
    this.currentVersion = options.currentVersion;
  }
  
}