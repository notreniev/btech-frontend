import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { getUserMock } from '../domains/mocks/user.mock';
import { UserModel } from '../domains/models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(user: UserModel): Observable<UserModel> {
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getUserMock());
      observer.complete();
    });
  }

  update(user: UserModel): Observable<UserModel> {
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getUserMock());
      observer.complete();
    });
  }

  findAll(): Observable<UserModel[]> {
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getUserMock());
      observer.complete();
    });
  }

  findById(userId: string): Observable<UserModel> {
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getUserMock());
      observer.complete();
    });
  }

  delete(userId: string): Observable<UserModel> {
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getUserMock());
      observer.complete();
    });
  }
}
