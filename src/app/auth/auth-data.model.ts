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
    public mobilePhone?: string,
  ) {}
 
}
