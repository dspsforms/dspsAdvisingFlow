import { VersionDetail } from './saved-form.model';
import { Signature } from './signature.model';

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
  studentSigStatus?: string;

  isParent?: boolean;
  childFormName?: string;

  // these two added because db has an index on them anyways
  studentEmail: string;
  collegeId: string;
  signatures: [Signature]; // there can be more than one signature
  children: [WrappedForm];

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
    lastMod?: Object,
    reCaptchaV3Token?: string,
    studentSigStatus?: string,
    isParent?: boolean,
    childFormName?: string,
    studentEmail?: string,
    collegeId?: string,
    signatures?: [Signature],
    children?: [WrappedForm]
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
    this.studentSigStatus = options.studentSigStatus;
    this.isParent = options.isParent;
    this.childFormName = options.childFormName;
    this.studentEmail = options.studentEmail;
    this.collegeId = options.collegeId;
    this.signatures = options.signatures;
    this.children = options.children;

  }

}
