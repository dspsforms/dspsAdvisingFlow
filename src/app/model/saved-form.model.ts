export class SavedForm {

  /*
   formName: this.formName,
      user: this.authService.getUserId(),
      form: this.form.value,
      formHistory: formHistory,
      versionDetails: [versionDetail] // array of VersionDetail
      edited:

  */
  formName?: string;
  user?: string; 
  form?: {};
  formHistory?: {};
  versionDetails?: VersionDetail[]; // each entry is of type VersionDetail
  currentVersion?: number;
  state?: string;
  edited?: boolean;  // legacy
  created?: Object;
  lastMod?: Object;
  reCaptchaV3Token?: string;
  
      constructor(options: {
        formName?: string,
        user?: string,
        form?: {},
        formHistory?: {},
        versionDetails?: VersionDetail[],
        currentVersion?: number,
        state?: string,
        edited?: boolean, 
        created?: Object,
        lastMod?: Object;
        reCaptchaV3Token?: string;
      }) {
        this.formName = options.formName;
        this.user = options.user;
        this.form = options.form || {};
        this.formHistory = options.formHistory;
        this.versionDetails = options.versionDetails;
        this.currentVersion = options.currentVersion || 0;
        this.state = options.state;
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