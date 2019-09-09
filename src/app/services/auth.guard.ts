import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor( private authService: AuthService, private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {

      // it get boolean value from auth.service.js
      let isActiveAuth = this.authService.getIsAuth();
      const token = localStorage.getItem('token');
      const expirationDate = localStorage.getItem('expiration');

      if (token && expirationDate) {
        isActiveAuth = true;
      }


      if (!isActiveAuth) {
        this.router.navigate(['/']);
      }

      return isActiveAuth;
  }




}
