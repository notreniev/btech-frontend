import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { getProjectMock } from '../../domains/mocks/project.mock';
import { ProjectModel } from '../../domains/models/project.model';
import { TaskModel } from '../../domains/models/task.model';
import { ProjectServiceMock } from '../../services/project.mock.service';
import { ProjectService } from '../../services/project.service';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const spyAlert = jasmine.createSpyObj('Popover', ['create', 'present', 'onDidDismiss', 'dismiss']);
  spyAlert.onDidDismiss.and.returnValue({ data: { action: 'signout' } });
  
  const spyAlertController = jasmine.createSpyObj('PopoverController', ['create', 'dismiss']);
  spyAlertController.create.and.callFake(() => {
    return spyAlert;
  });  


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule, HttpClientTestingModule],
      declarations: [ CardComponent ],
      providers: [
        { provide: ProjectService, useClass: ProjectServiceMock },
        { provide: AlertController, useValue: spyAlertController }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.project = getProjectMock();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Behaviors', () => {
    it('Should add a Task into the Tasks collection ', async () => {
      await component.addTask('New Task');
      fixture.detectChanges();
      expect(component.project.tasks.length).toBe(7);
    });

    it('Should edit a Task and set editingTaskDescription to true', async () => {
      await component.editTask(new TaskModel());
      fixture.detectChanges();
      expect(component.editingTaskDescription).toBe(true);
    });

    it('Should finish a Task and push to done tasks collection', async () => {
      await component.finishTask(new TaskModel());
      fixture.detectChanges();
      expect(component.project.done.length).toBe(1);
    });

    it('Should save a Task from tasks collection', async () => {
      await component.saveTask(component.project.tasks[1]);
      fixture.detectChanges();
      expect(component.project.tasks.length).toBe(6);
    });

    it('Should remove a Task from tasks collection', async () => {
      spyAlert.onDidDismiss.and.returnValue({ role: 'ok' });
      await component.removeTask(component.project.tasks[1]);
      fixture.detectChanges();
      expect(component.project.tasks.length).toBe(5);
    });

    it('Should call editTitle and set editingProjectTitle to true', () => {
      component.editTitle();
      fixture.detectChanges();
      expect(component.editingProjectTitle).toBe(true);
    });

    it('Should call save and call emitter', () => {
      component.save(new ProjectModel());
      fixture.detectChanges();
      expect(component.editingProjectTitle).toBe(false);
    });

    it('Should call remove and call emitter', () => {
      const spyOnRemove = spyOn(component.removeProject, 'emit');
      component.remove(new ProjectModel());
      fixture.detectChanges();
      expect(spyOnRemove).toHaveBeenCalled();
    });

    it('Should call cancel and set editingProjectTitle to false', () => {
      component.cancel();
      fixture.detectChanges();
      expect(component.editingProjectTitle).toBe(false);
    });


  });
});
