import { Component, OnInit } from '@angular/core';
import { getProjectsMock } from '../../domains/mocks/project.mock';
import { ProjectModel } from '../../domains/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects: ProjectModel[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    this.projects = getProjectsMock();
  }

}
