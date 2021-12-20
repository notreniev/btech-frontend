import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProjectModule } from '../project/project.module';

import { CardFormComponent } from './card-form.component';

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFormComponent ],
      imports: [IonicModule.forRoot(), ProjectModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Behaviors', () => {
    it('Should test addProject', () => {
      const spyUpdate = spyOn(component.updateProjectsEvent, 'emit');
      component.addProject('new project');

      expect(spyUpdate).toHaveBeenCalled();
    });
  });
});
