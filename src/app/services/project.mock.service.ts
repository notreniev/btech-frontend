import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectModel } from '../domains/models/project.model';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { Observable, Subscriber } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getProjectMock, getProjectsMock } from '../domains/mocks/project.mock';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceMock extends BaseService{

  constructor(private httpClient: HttpClient) {
    super();
   }

   create(project: ProjectModel):Observable<ProjectModel>{
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getProjectMock());
      observer.complete();
    });
   }

   update(project: ProjectModel):Observable<ProjectModel>{
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getProjectMock());
      observer.complete();
    });
  }

  getProjects(): Observable<ProjectModel[]>{
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getProjectsMock());
      observer.complete();
    });
  }

  getProjectById(projectId: string): Observable<ProjectModel>{
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getProjectMock()[0]);
      observer.complete();
    });
  }

  findByUserId(userId: string): Observable<ProjectModel[]>{
    return new Observable((observer: Subscriber<any>) => {
      observer.next(getProjectsMock());
      observer.complete();
    });
  }

  delete(projectId: string): Observable<ProjectModel>{
    return new Observable((observer: Subscriber<any>) => {
      observer.next([]);
      observer.complete();
    });
  }
}
