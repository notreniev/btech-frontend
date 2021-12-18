import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProjectModule } from '../../components/project/project.module';

import { ProjectsPage } from './projects.page';

describe('ProjectsPage', () => {
  let component: ProjectsPage;
  let fixture: ComponentFixture<ProjectsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsPage ],
      imports: [IonicModule.forRoot(), ProjectModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
