import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { getUserMock } from '../../domains/mocks/user.mock';
import { UserServiceMock } from '../../services/user.mock.service';
import { UserService } from '../../services/user.service';

import { SignupPage } from './signup.page';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;

  const spyToast = jasmine.createSpyObj('Toast', ['create', 'present', 'onDidDismiss', 'dismiss']);
  spyToast.onDidDismiss.and.returnValue({ data: { action: 'signin' } });
  
  const spyToastController = jasmine.createSpyObj('ToastController', ['create', 'dismiss']);
  spyToastController.create.and.callFake(() => {
    return spyToast;
  });  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        {provide: UserService, useClass: UserServiceMock },
        { provide: ToastController, useValue: spyToastController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Behaviors', () => {
    it('Should register a new user', async() => {
      await component.register(getUserMock());
      fixture.detectChanges();
  
      expect(spyToastController.create).toHaveBeenCalled();  
    });
  });
});
