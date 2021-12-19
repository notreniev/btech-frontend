import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectModel } from '../domains/models/project.model';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

  constructor(private httpClient: HttpClient) {
    super();
   }

   create(project: ProjectModel):Observable<ProjectModel>{
     return this.httpClient
     .post<ProjectModel>(`${environment.api}/projects`, project, this.httpOptions())
     .pipe(catchError(this.handleError));
   }

   update(project: ProjectModel):Observable<ProjectModel>{
    return this.httpClient
    .patch<ProjectModel>(`${environment.api}/projects/${project._id}`, project, this.httpOptions())
    .pipe(catchError(this.handleError));
  }

  getProjects(): Observable<ProjectModel[]>{
      return this.httpClient
      .get<ProjectModel[]>(`${environment.api}/projects`, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  getProjectById(projectId: string): Observable<ProjectModel>{
    return this.httpClient
    .get<ProjectModel>(`${environment.api}/projects/${projectId}`, this.httpOptions())
    .pipe(catchError(this.handleError));
  }

  findByUserId(userId: string): Observable<ProjectModel[]>{
    return this.httpClient
    .get<ProjectModel[]>(`${environment.api}/projects/${userId}/user`, this.httpOptions())
    .pipe(catchError(this.handleError));
  }

  delete(projectId: string): Observable<ProjectModel>{
    return this.httpClient
      .delete<ProjectModel>(`${environment.api}/projects/${projectId}`, this.httpOptions())
      .pipe(catchError(this.handleError));
  }
}
