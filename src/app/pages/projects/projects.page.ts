import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../domains/models/project.model';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects: ProjectModel[] = [];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    const userValue = this.authService.userValue;
    this.loadProjects(userValue[0]._id);
  }

  async loadProjects(userId: string){
    this.projects = await this.projectService
      .findByUserId(userId)
      .toPromise();
  }
}
