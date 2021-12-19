import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../domains/models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  isLoggedIn = false;
  userSubject: BehaviorSubject<UserModel>;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    super();

    this.userSubject = new BehaviorSubject<UserModel>(this.getUserFromSessionStorage());
  }

  get userValue(): UserModel {
    return this.userSubject.value;
  }

  async authenticate(user: UserModel): Promise<UserModel> {
    const result = await this.httpClient
      .post<UserModel>(`${environment.api}/auth/signin`, user, this.httpOptions())
      .toPromise();

    if (result) {
      this.setUserOnSessionStorage(result);
    }

    return result;
  }

  async signout() {
    /**
     * Do other stuff here before signout
     */
    this.router.navigate(['/signin']);
  }

  setUserOnSessionStorage(user: UserModel) {
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUserFromSessionStorage() {
    const loggedUser = sessionStorage.getItem('loggedUser');
    const loggedUserObj = JSON.parse(loggedUser);
    return loggedUserObj;
  }
}
