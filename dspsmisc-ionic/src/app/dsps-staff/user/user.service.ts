import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "../../auth/auth-data.model";
import { environment } from "../../../environments/environment";
import { Student } from 'src/app/model/student.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dspsUserList: AuthData[];
  private dspsUserListSmall: AuthData[]; // same as dspsUserList but with smaller data

  private students: Student[];

  // students may represent the current page being displayed.
  // cachedStudents may or may not have an intersection
  private cachedStudents = {}; 


  private dspsUserListListener = new Subject<AuthData[]>();
  private dspsUserListSmallListener = new Subject<AuthData[]>();

  private studentsListener = new Subject<Student[]>();

  private oneStudentListener = new Subject<Student>();

  constructor(private http: HttpClient, private router: Router) { }

  // retrieve list of users -- dsps staff, faculty, and admin only
  // for instructors and students, use separate end point
  listDspsUsers() {

    const url = environment.server + '/api/user/listdsps' ;
    this.http.get<{ message: string, dspsUsers: AuthData[] }>(url)
      .subscribe(res => {
        console.log("listDspsUsers()", res);

        this.dspsUserList = res.dspsUsers;
        this.dspsUserListListener.next([...this.dspsUserList]);

      },
      err => {
        console.log("err", err);
    });
  }

  // this will list only those students who have registered on our system
  listStudents() {

    const url = environment.server + '/api/user/liststudents' ;
    this.http.get<{ message: string, students: Student[] }>(url)
      .subscribe(res => {
        console.log("listStudents()", res);

        this.students = res.students;
        this.studentsListener.next([...this.students]);

      },
      err => {
        console.log("err", err);
    });
  }

  // get student from cached this.students, if none found, return null
  getStudentFromCache(collegeId: string) {

    // first check cachedStudents
    let student = this.cachedStudents[collegeId];

    if (student) { return student; }

    // next, check this.students
    if (this.students && this.students.length > 0) {
      student = this.students.find(st =>  st.collegeId === collegeId );
    }

    // if found, non null, else null
    return student;
  }

  // fetch student from server
  fetchStudentFromServer(collegeId: string) {

    const url = environment.server + '/api/user/student/' + collegeId;
    this.http.get<{ message: string, student: Student }>(url)
      .subscribe(res => {
        console.log("fetchStudent()", res);

        // cache this student with key == collegeId
        if (res.student) {
          this.cachedStudents[res.student.collegeId] = res.student;
        }

        this.oneStudentListener.next(res.student);

      },
      err => {
        console.log("err", err);
    });

  }

  listDspsUsersSmall() {

    const url = environment.server + '/api/user/listdspssmall' ;
    this.http.get<{ message: string, dspsUsers: AuthData[] }>(url)
      .subscribe(res => {
        console.log("listDspsUsersSmall()", res);

        this.dspsUserListSmall = res.dspsUsers;
        this.dspsUserListSmallListener.next([...this.dspsUserListSmall]);

      },
      err => {
        console.log("err", err);
    });
  }

  getDspsUserListListener() {
    return this.dspsUserListListener.asObservable();
  }

  getDspsUserListSmallListener() {
    return this.dspsUserListSmallListener.asObservable();
  }
  // studentsListener
  getStudentsListener() {
    return this.studentsListener.asObservable();
  }
  getOneStudentListener() {
    return this.oneStudentListener.asObservable();
  }

  getDspsUserList() {
    return [...this.dspsUserList];
  }

  getDspsUserListSmall() {
    if (this.dspsUserListSmall) {
      return [...this.dspsUserListSmall];
    } else { return null; }
    
  }

  getStudents() {
    return [...this.students];
  }

}
