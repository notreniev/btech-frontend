import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { getUserMock } from '../../domains/mocks/user.mock';
import { AuthServiceMock } from '../../services/auth.mock.service';
import { AuthService } from '../../services/auth.service';

import { SigninPage } from './signin.page';

describe('SigninPage', () => {
  let component: SigninPage;
  let fixture: ComponentFixture<SigninPage>;

  const spyToast = jasmine.createSpyObj('Toast', ['create', 'present', 'onDidDismiss', 'dismiss']);
  spyToast.onDidDismiss.and.returnValue({ data: { action: 'signin' } });
  
  const spyToastController = jasmine.createSpyObj('ToastController', ['create', 'dismiss']);
  spyToastController.create.and.callFake(() => {
    return spyToast;
  });  


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: ToastController, useValue: spyToastController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Behaviors', () => {
    it('Should call signin method', async () => {
      await component.signin(getUserMock());
      fixture.detectChanges();

      expect(spyToastController.create).toHaveBeenCalled();
    });
  });
});
