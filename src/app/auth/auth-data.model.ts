export interface AuthData {
  email: string;
  name?: string;
  password: string;
  isStaff?: boolean;
  isAdmin?: boolean;
  isFaculty?: boolean; // dsps faculty
  isStudent?: boolean;
  isInstructor?: boolean; // non dsps faculty or instructor
  mobilePhone?: string;

  created?: Date; // tz format
  lastMod?: Date;
}
