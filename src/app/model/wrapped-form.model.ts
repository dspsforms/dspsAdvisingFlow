import { VersionDetail } from './saved-form.model';

export class WrappedForm {

  formKey?: string;
  _id?: string;
  formWithLatestHistory?: {};
  state?: string;
  formName?: string;
  user?: string;
  formHistoryArr?: {};
  versionDetails?: VersionDetail[];
  currentVersion?: number;
  edited: boolean;
  created: Object;
  lastMod?: Object;
  reCaptchaV3Token?: string;
  
  constructor(options: {
    formKey?: string,
    _id?: string,
    formWithLatestHistory?: any,
    state?: string,
    formName?: string,
    user?: string,
    formHistoryArr?: {},
    versionDetails?: VersionDetail[],
    currentVersion?: number,
    edited?: boolean,
    created?: Object,
    lastMod?: Object;
    reCaptchaV3Token?: string;
  })
  {
    this.formKey = options.formKey;
    this._id = options._id;
    this.formWithLatestHistory = options.formWithLatestHistory || {};
    this.state = options.state;
    this.formName = options.formName;
    this.user = options.user;
    this.formHistoryArr = options.formHistoryArr;
    this.versionDetails = options.versionDetails;
    this.currentVersion = options.currentVersion;
    this.edited = options.edited;
    this.created = options.created;
    this.lastMod = options.lastMod;
    this.reCaptchaV3Token = options.reCaptchaV3Token;

  }
  
}