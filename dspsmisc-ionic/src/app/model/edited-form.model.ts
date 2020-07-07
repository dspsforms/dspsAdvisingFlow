import { VersionDetail } from './saved-form.model';

export class EditedForm {

  _id: string;
  formName?: string;
  user?: string; 
  formWithLatestHistory?: {};
  formHistoryArr?: {};
  versionDetails?: VersionDetail[]; // each entry is of type VersionDetail
  currentVersion?: number;
  state?: string;
  edited?: boolean;  // legacy
  created?: Object;
  lastMod?: Object;
  reCaptchaV3Token?: string;
  isParent?: boolean;
  childFormName?: string;

 
  
    constructor(options: {
      _id: string,
      formName?: string,
      user?: string,
      formWithLatestHistory?: {},
      formHistoryArr?: {},
      versionDetails?: VersionDetail[],
      currentVersion?: number,
      state?: string,
      edited?: boolean, 
      created?: Object,
      lastMod?: Object,
      reCaptchaV3Token?: string,
      isParent?: boolean,
      childFormName?: string
        
    }) {
      this._id = options._id;
      this.formName = options.formName;
      this.user = options.user;
      this.formWithLatestHistory = options.formWithLatestHistory || {};
      this.formHistoryArr = options.formHistoryArr;
      this.versionDetails = options.versionDetails;
      this.currentVersion = options.currentVersion || 0;
      this.state = options.state;
      this.edited = options.edited || false;
      this.created = options.created;
      this.lastMod = options.lastMod;
      this.reCaptchaV3Token = options.reCaptchaV3Token;
      this.isParent = options.isParent;
      this.childFormName = options.childFormName;
    }
  
  }