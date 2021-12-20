import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, IonicModule } from '@ionic/angular';
import { getProjectsMock } from '../../domains/mocks/project.mock';
import { getUserMock } from '../../domains/mocks/user.mock';
import { AuthServiceMock } from '../../services/auth.mock.service';
import { AuthService } from '../../services/auth.service';
import { ProjectServiceMock } from '../../services/project.mock.service';
import { ProjectService } from '../../services/project.service';

import { ProjectComponent } from './project.component';
import { ProjectModule } from './project.module';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  const spyAlert = jasmine.createSpyObj('Popover', ['create', 'present', 'onDidDismiss', 'dismiss']);
  spyAlert.onDidDismiss.and.returnValue({ data: { action: 'signout' } });
  
  const spyAlertController = jasmine.createSpyObj('PopoverController', ['create', 'dismiss']);
  spyAlertController.create.and.callFake(() => {
    return spyAlert;
  });  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent ],
      imports: [IonicModule.forRoot(), ProjectModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: ProjectService, useClass: ProjectServiceMock},
        {provide: AuthService, useClass: AuthServiceMock },
        { provide: AlertController, useValue: spyAlertController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    component.projects = getProjectsMock();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Name of the group', () => {
    it('Should test showHideAddProject', () => {
      component.showHideAddProject();
      fixture.detectChanges();
      expect(component.showHideForm).toBe(true);
    });

    it('Should test updateProject', () => {
      const projectMock = component.projects[0];
      projectMock.title = 'test mock'
      component.updateProject(projectMock);
      fixture.detectChanges();
      expect(component.projects[0].title).toBe(projectMock.title);
    });

    it('Should test updateProjects array when inserted a new one', async() => {
      const projectMock = component.projects[0];
      projectMock.title = 'test mock'
      projectMock.user = getUserMock();

      await component.updateProjects(projectMock);
      fixture.detectChanges();
      expect(component.projects.length).toBe(3);
    });

    it('Should test removeProject array ', async() => {
      spyAlert.onDidDismiss.and.returnValue({ role: 'ok' });
      const projectMock = component.projects[0];

      await component.removeProject(projectMock);
      fixture.detectChanges();
      expect(component.projects.length).toBe(1);
    });

  });
});
