import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MenuComponent } from './components/menu/menu.component';
import { UserModel } from './domains/models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  
  currentUser: UserModel = new UserModel();

  constructor(
    private authService: AuthService,
    private popoverController: PopoverController,
    private router: Router) {
  }

  ngOnInit(){
    this.initializeApp();
  }

  signout(){
    this.authService.signout();
  }


  initializeApp() {
    this.authService.currentUser.subscribe(user => {
      if (user) this.currentUser = user[0];
    }, () => {
      this.router.navigate(['signin']);
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const { data } = await popover.onDidDismiss();

    if (data.action === 'signout'){
      this.currentUser = new UserModel();
      this.signout();
    }
  }

}
