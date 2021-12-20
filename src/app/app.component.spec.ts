import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PopoverController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { getUserMock } from './domains/mocks/user.mock';
import { AuthServiceMock } from './services/auth.mock.service';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const spyPopover = jasmine.createSpyObj('Popover', ['create', 'present', 'onDidDismiss', 'dismiss']);
  spyPopover.onDidDismiss.and.returnValue({ data: { action: 'some action' } });
  
  const spyPopoverController = jasmine.createSpyObj('PopoverController', ['create', 'dismiss']);
  spyPopoverController.create.and.callFake(() => {
    return spyPopover;
  });  

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: PopoverController, useValue: spyPopoverController }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.currentUser = getUserMock();
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Component Behaviors', () => {
    it('Should test app initilization', () => {
      component.initializeApp();
      fixture.detectChanges();
      expect(component.currentUser).toBeDefined();
    });

    it('Should test signout method', () => {
      const spyOnSessionStorage = spyOn(sessionStorage, 'removeItem');
      component.signout();
      fixture.detectChanges();
      expect(spyOnSessionStorage).toHaveBeenCalled();
    });

    it('Should call presentPopover', async () => {
      
      await component.presentPopover(new Event('click'));
      fixture.detectChanges();

      expect(spyPopoverController.create).toHaveBeenCalled();
    });
  });

});
