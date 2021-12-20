import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserModel } from '../domains/models/user.model';
import { BaseService } from './base.service';
import { OnDestroy } from '@angular/core';
import { LoginModel } from '../domains/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService implements OnDestroy {

  userSubject: BehaviorSubject<LoginModel>;
  currentUser: Observable<LoginModel>;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    super();

    this.userSubject = new BehaviorSubject<LoginModel>(this.getUserFromSessionStorage());
    this.currentUser = this.userSubject.asObservable();
  }

  get userValue(): LoginModel {
    return this.userSubject.value;
  }

  async authenticate(user: UserModel): Promise<LoginModel> {
    const result = await this.httpClient
      .post<LoginModel>(`${environment.api}/auth/signin`, user, this.httpOptions())
      .pipe(map(login => {
        this.userSubject.next(login);
        return login;
      })).toPromise();

    if (result) {
      this.setUserOnSessionStorage(result);
    }

    return result;
  }

  signout() {
    sessionStorage.removeItem('loggedUser');
    this.router.navigate(['signin']);
  }

  setUserOnSessionStorage(login: LoginModel) {
    this.userSubject.next(login);
    sessionStorage.setItem('loggedUser', JSON.stringify(login));
  }

  getUserFromSessionStorage() {
    const loggedUser = sessionStorage.getItem('loggedUser');
    const loggedUserObj = JSON.parse(loggedUser);
    return loggedUserObj;
  }

  isLoggedIn(): boolean {
    const user = this.userValue;
    if (user){
      return (user && user.token) ? true : false;
    }
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }

}
