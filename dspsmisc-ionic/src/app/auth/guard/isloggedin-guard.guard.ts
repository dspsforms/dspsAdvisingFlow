import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinGuardGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    
      // is loggged in?
    const role = this.authService.getRole();
    if (!role) {
      this.router.navigateByUrl('/auth');
      return false;
    } else if (role.isStudent || role.isStaff || role.isFaculty || role.isInstructor || role.isAdmin) {
        return true;
    } else {
      console.log("unknown role ", role);
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
