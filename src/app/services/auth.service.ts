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
export class AuthService extends BaseService{

  isLoggedIn = false;
  userSubject: BehaviorSubject<UserModel>;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    super();

    this.userSubject = new BehaviorSubject<UserModel>(new UserModel());
  }

  get userValue(): UserModel {
    return this.userSubject.value;
  }

  async authenticate(user: UserModel): Promise<UserModel> {
    const result = await this.httpClient
      .post<UserModel>(`${environment.api}/auth/signin`, user, this.httpOptions())
      .toPromise();
    return result;
  }

  async signout(){
    /**
     * Do other stuff here before signout
     */
    this.router.navigate(['/signin']);
  }

}
