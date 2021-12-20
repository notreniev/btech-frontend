import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserModel } from '../../domains/models/user.model';
import { AuthService } from '../../services/auth.service';
import { Severity } from '../../utils';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  user: UserModel = new UserModel;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async signin(user: UserModel){
    try {
      const authenticated = await this.authService.authenticate(user);

      if (authenticated){
        this.presentUserFeedback('Signin successful', Severity.SUCCESS);
        this.router.navigate(['projects']);
      }else{
        this.presentUserFeedback('User/password doesn\'t match', Severity.FAILURE);
      }
    } catch (error) {
      console.log('error', error.error.message)
      this.presentUserFeedback(`Something\'s got wrong: ${error.error.message}`, Severity.FAILURE);
    }
  }

  async presentUserFeedback(message: string, severity: string){
    const toast = await this.toastController.create({
      message,
      color: severity,
      cssClass: 'ion-text-center',
      animated: true,
      duration: 3000
    });
    toast.present();
  }
}
