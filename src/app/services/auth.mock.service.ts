import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../domains/models/user.model';
import { BaseService } from './base.service';
import { OnDestroy } from '@angular/core';
import { getUserMock } from '../domains/mocks/user.mock';
import { LoginModel } from '../domains/models/login.model';
import { getLoginMock } from '../domains/mocks/login.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceMock extends BaseService implements OnDestroy {

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
    return getLoginMock();
  }

  async authenticate(user: UserModel): Promise<LoginModel> {
    try {
      const result = getLoginMock();
      this.userSubject.next(result);
      return result;
    } catch (error) {
      throw {error: { error: {message: 'error' }}};
    }
  }

  signout() {
    sessionStorage.removeItem('loggedUser');
  }

  setUserOnSessionStorage(login: LoginModel) {
    this.userSubject.next(getLoginMock());
    sessionStorage.setItem('loggedUser', JSON.stringify(login.user));
  }

  getUserFromSessionStorage() {
    const loggedUserObj = getLoginMock();
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
