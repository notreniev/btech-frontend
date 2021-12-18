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

  getProjects(): Observable<ProjectModel[]>{
      return this.httpClient.get<ProjectModel[]>(`${environment.api}/projects`, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  getProject(){

  }
}
