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
  formWithLatestHistory?: {}; // form with latest history
  formHistoryArr?: {}; // entire history of form
  versionDetails?: VersionDetail[]; // each entry is of type VersionDetail
  currentVersion?: number;
  state?: string;
  edited?: boolean;  // legacy
  created?: Object;
  lastMod?: Object;
  reCaptchaV3Token?: string;
  isParent?: boolean; // for aap2 top level
  parentId: string; // if this is a child
  childFormName?: string;
  
      constructor(options: {
        formName?: string,
        user?: string,
        formWithLatestHistory?: {},
        formHistoryArr?: {},
        versionDetails?: VersionDetail[],
        currentVersion?: number,
        state?: string,
        edited?: boolean, 
        created?: Object,
        lastMod?: Object;
        reCaptchaV3Token?: string,
        isParent?: boolean,
        parentId?: string,
        childFormName?: string
      }) {
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
        this.parentId = options.parentId;
        this.childFormName = options.childFormName;
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