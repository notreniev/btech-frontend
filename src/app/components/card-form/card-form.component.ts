import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../domains/models/project.model';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnInit {
  
  project: ProjectModel = new ProjectModel();
  @Output() updateProjectsEvent: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();

  constructor() { }

  ngOnInit() {}

  addProject(title: string){
    const project = new ProjectModel();
    project.title = title;
    
    this.updateProjectsEvent.emit(project);

  }

}
