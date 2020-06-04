export class Role {

  constructor(
    public isStaff: boolean,
    public isAdmin: boolean,
    public isFaculty: boolean, // dsps faculty
    public isStudent?: boolean,
    public isInstructor?: boolean, // non dsps faculty or instructor
  ) {}
  
}

export class AuthData {

  constructor(
    public email: string,
    public password: string,
    public role?: Role,
    public name?: string,
    public created?: Date, // tz format
    public lastMod?: Date,
    public cellPhone?: string,
    public _id?: string, // user Id
  ) {}
 
}

export class StudentData {
  constructor(
    public email: string,
    public password: string,
    public name?: string,
    public collegeId?: string,
    public cellPhone?: string,
    public created?: Date, // tz format
    public lastMod?: Date,
    public _id?: string, // user Id
  ) {}
}

export interface MongoErr {
  driver?: boolean;
  name?: string;
  index?: number;
  code?: number;
  errmsg?: string;
}

export interface SubmitStatus {
  message: string;
  err: string | MongoErr | {}; 
}

export interface UserFromRandomKey {
  user?: AuthData;
  emailFromRandomKey?: string;
  err?: string | MongoErr | {}; 
  message?: string;
  key?: string; 
}
