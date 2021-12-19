import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserModel } from '../domains/models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(user: UserModel): Observable<UserModel> {
    return this.httpClient
      .post<UserModel>(`${environment.api}/users`, user, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  update(user: UserModel): Observable<UserModel> {
    return this.httpClient
      .patch<UserModel>(`${environment.api}/users/${user._id}`, user, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  findAll(): Observable<UserModel[]> {
    return this.httpClient
      .get<UserModel[]>(`${environment.api}/users`, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  findById(userId: string): Observable<UserModel> {
    return this.httpClient
      .get<UserModel>(`${environment.api}/users/${userId}`, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  delete(userId: string): Observable<UserModel> {
    return this.httpClient
      .delete<UserModel>(`${environment.api}/users/${userId}`, this.httpOptions())
      .pipe(catchError(this.handleError));
  }
}
