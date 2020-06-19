
export class Signature {

    public formName: string;
    public formId: string;
    public formVersion?: number;
    public email: string; // signer's email
    public collegeId: string;
    public name: string; // signer's name
    public signature: string;
    public userId: string;
    public signatureDate: Date;
    public lastMod: Date;
    public ipAddr: string;
    public loginSessionId: string;
    public _id?: string;

    constructor( options: 
            {
            formName?: string,
            formId?: string,
            email?: string,
            formVersion?: number,
            collegeId?: string,
            name?: string,
            userId?: string; // user._id of student
            signatureDate?: Date,
            signature?: string,
            lastMod?: Date,
            ipAddr?: string,
            loginSessionId?: string,
            _id? : string

        }) {
        this.formName = options.formName;
        this.formId = options.formId;
        this.formVersion = options.formVersion;
        this.email = options.email;
        this.collegeId = options.collegeId;
        this.name = options.name;
        this.userId = options.userId;
        this.signature = options.signature;
        this.signatureDate = options.signatureDate;
        this.lastMod = options.lastMod;
        this.ipAddr = options.ipAddr;
        this.loginSessionId = options.loginSessionId;
        this._id = options._id;
    }
    
}