import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const spyPopover = jasmine.createSpyObj('Popover', ['create', 'present', 'onDidDismiss', 'dismiss']);
  spyPopover.onDidDismiss.and.returnValue({ data: { action: 'some action' } });
  
  const spyPopoverController = jasmine.createSpyObj('PopoverController', ['create', 'dismiss']);
  spyPopoverController.create.and.callFake(() => {
    return spyPopover;
  });  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: PopoverController, useValue: spyPopoverController }
      ],

    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Behaviors', () => {
    it('Should call popover dismiss', async() => {
      await component.signout()
      fixture.detectChanges();
      expect(spyPopoverController.dismiss).toHaveBeenCalled();
    });
  });
});
