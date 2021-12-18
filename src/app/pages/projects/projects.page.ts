import { Component, OnInit } from '@angular/core';
import { getProjectsMock } from '../../domains/mocks/project.mock';
import { ProjectModel } from '../../domains/models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects: ProjectModel[] = [];

  constructor(private projectService: ProjectService) { 
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  async loadProjects(){
    this.projects = await this.projectService
      .getProjects()
      .toPromise();
  }
}
