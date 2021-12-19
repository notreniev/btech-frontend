import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

    async canActivate(){
      const isLoggedIn = this.authService.isLoggedIn();

      if (isLoggedIn){
        return true;
      }

      this.router.navigate(['signin']);
      return false;

    }

}
