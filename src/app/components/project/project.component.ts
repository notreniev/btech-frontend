import { Component, Input, OnInit } from '@angular/core';
import { ProjectModel } from '../../domains/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  @Input() projects: ProjectModel[];

  title: string;

  constructor() { 
  }

  ngOnInit(): void {
  }

  addProject(title: string){
    const project = new ProjectModel();
    project.title = title;
    this.projects.push(project);
    this.title = '';
    this.projects.reverse();
  }

}
