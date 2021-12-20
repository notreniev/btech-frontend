import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../domains/models/user.model';
import { BaseService } from './base.service';
import { OnDestroy } from '@angular/core';
import { getUserMock } from '../domains/mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceMock extends BaseService implements OnDestroy {

  userSubject: BehaviorSubject<UserModel>;
  currentUser: Observable<UserModel>;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    super();

    this.userSubject = new BehaviorSubject<UserModel>(this.getUserFromSessionStorage());
    this.currentUser = this.userSubject.asObservable();
  }

  get userValue(): UserModel {
    return getUserMock();
  }

  async authenticate(user: UserModel): Promise<UserModel> {
    const result = getUserMock();
    this.userSubject.next(result);
    return result;
  }

  signout() {
    sessionStorage.removeItem('loggedUser');
  }

  setUserOnSessionStorage(user: UserModel) {
    this.userSubject.next(user);
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getUserFromSessionStorage() {
    const loggedUser = sessionStorage.getItem('loggedUser');
    const loggedUserObj = JSON.parse(loggedUser);
    return loggedUserObj;
  }

  isLoggedIn(): boolean {
    const user = this.userValue;
    if (user){
      return (user[0] && user[0].email) ? true : false;
    }
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }

}
