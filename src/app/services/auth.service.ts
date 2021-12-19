import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserModel } from '../domains/models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

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
    return this.userSubject.value;
  }

  async authenticate(user: UserModel): Promise<UserModel> {
    const result = await this.httpClient
      .post<UserModel>(`${environment.api}/auth/signin`, user, this.httpOptions())
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      })).toPromise();

    if (result) {
      this.setUserOnSessionStorage(result);
    }

    return result;
  }

  signout() {
    sessionStorage.removeItem('loggedUser');
    // location.reload();
    this.router.navigate(['signin']);
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

}
