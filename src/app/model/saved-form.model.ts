export class SavedForm {

  formName?: string;
  user?: string; // legacy
  form?: {};
  // key == version number, value == versionDetail
  versionHistory?: {};
  currentVersion?: number;
  edited?: boolean;  // legacy
  created?: Object;
  lastMod?: Object;
  reCaptchaV3Token?: string;
  
      constructor(options: {
        formName?: string,
        user?: string,
        form?: {},
        versionHistory?: {},
        currentVersion?: number,
        edited?: boolean, 
        created?: Object,
        lastMod?: Object;
        reCaptchaV3Token?: string;
      }) {
        this.formName = options.formName;
        this.user = options.user;
        this.form = options.form || {};
        this.versionHistory = options.versionHistory;
        this.currentVersion = options.currentVersion || 0;
        this.edited = options.edited || false;
        this.created = options.created;
        this.lastMod = options.lastMod;
        this.reCaptchaV3Token = options.reCaptchaV3Token;
      }
  
  }
  
export class VersionDetail {
  public version: number;
  public date: Date;
  public completedByUserId: string; // user._id of mongodb

  constructor(options: {
    version: number,
    date: Date,
    completedByUserId: string
  }) {
    this.version = options.version;
    this.date = options.date;
    this.completedByUserId = options.completedByUserId;
  }
  
}