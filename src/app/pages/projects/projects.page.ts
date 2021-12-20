import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(logged => {
      if (logged.user) this.loadProjects(logged.user._id);
    }, () => {
      this.router.navigate(['signin']);
      location.reload();
    });
  }

  async loadProjects(userId: string){
    this.projects = await this.projectService
      .findByUserId(userId)
      .toPromise();
  }
}
