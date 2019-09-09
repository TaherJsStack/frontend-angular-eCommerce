import { UsersService }    from './users.service';
import { UserModule }      from './../modules/user.module';
import { AuthSigninModel } from './../modules/auth.module';
import { HttpClient }      from '@angular/common/http';
import { Injectable }      from '@angular/core';
import { Router }          from '@angular/router';
import { Subject }         from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  authSigninModel: AuthSigninModel[] = [];
  authActive = new Subject<boolean>();
  userId   = new Subject<string>();
  isAuthenticated = false;
  private tokenTimer: any;

  getErrorMsg = new Subject<string>();

  constructor(private router: Router,
              private http: HttpClient,
              private userService: UsersService) {}

  // get token whene auth login
  // send token to ./auth-interceptor.ts
  getToken() {
  }

  // send user statuse to ./auth.guard.js
  // used in home page and side menu too
  getIsAuth() {
  }

  // to make every component in app know user status true or false
  // 1=> private authStatusListener = new Subject<boolean>();
  // 2=> return this.authStatusListener.asObservable();
  // 3=> this.authStatusListener.next(true);
  getAuthStatusListener() {
  }

  getUserIdListener() {
    return this.userId.asObservable();
  }

  getErrMsg() {
    return this.getErrorMsg.asObservable();
  }

  login(authSModel: AuthSigninModel) {
    this.http.post<{token: string, message: string, expiresIn: number, authId: string, roll: string}>(
      'http://localhost:3000/api/auth/signin', authSModel
      ).subscribe(
          result => {
            const token = result.token;
            this.token  = result.token;
            const roll  = result.roll;
            console.log('user id => ', result.authId);
            console.log('roll => ', roll);
            if (token && roll === 'user') {
              const expiresInDuration = result.expiresIn;
              this.setAuthTimer(expiresInDuration);
              this.isAuthenticated = true;
              this.authStatusListener.next(true);
              this.userId.next(result.authId);
              const now = new Date();
              const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
              console.log(expirationDate);
              this.saveAuthData(result.authId, token, expirationDate);
              this.router.navigate(['/User/Profile']);
            }
          },
          err => {
            console.log('err ::=>', err.error.message);
            this.getErrorMsg.next(err.error.message);
          }

        );
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(userId: string, token: string, expirationDate: Date) {

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {

  }

  logout() {

  }

  private clearAuthData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }


}
