import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../../auth/settings/settings.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public settings: SettingsService, private router: Router, public authenticationService: LoginService) { }
  canActivate(): boolean {

    if (this.settings.isAuthenticated() && this.authenticationService.LogIn()) {
      return true;
    }
    else {
      console.log('Token expirado: ', this.authenticationService.LogIn());
      this.authenticationService.LogOut();
      return false;
    }
  }

}
