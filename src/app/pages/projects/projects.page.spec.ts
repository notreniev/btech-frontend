import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ProjectModule } from '../../components/project/project.module';
import { getProjectsMock } from '../../domains/mocks/project.mock';
import { getUserMock } from '../../domains/mocks/user.mock';
import { AuthServiceMock } from '../../services/auth.mock.service';
import { AuthService } from '../../services/auth.service';
import { ProjectServiceMock } from '../../services/project.mock.service';
import { ProjectService } from '../../services/project.service';

import { ProjectsPage } from './projects.page';

describe('ProjectsPage', () => {
  let component: ProjectsPage;
  let fixture: ComponentFixture<ProjectsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsPage ],
      imports: [IonicModule.forRoot(), ProjectModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ProjectService, useClass: ProjectServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPage);
    component = fixture.componentInstance;
    component.projects = getProjectsMock();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Behaviors', () => {
    it('Should call loadProjects', async () => {
      await component.loadProjects(getUserMock()._id);
   
      expect(component.projects.length).toBeGreaterThan(0);
    });
  });
});
