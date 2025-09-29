import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public user: any;
  helper = new JwtHelperService();
  constructor() {
    this.user = {
      idUsuario: '',
      usuario: '',      
      isAuthenticated: false,
      isAdmin: false,      
    };
  }

  getUserSetting(name: any) {
    return name ? this.user[name] : this.user;
  }

  setUserSetting(name: any, value: any) {
    if (typeof this.user[name] !== 'undefined') {
      this.user[name] = value;
    }
  }

  isAuthenticated() {
    if (localStorage.getItem('auth_token_bodegaarcana') !== undefined && localStorage.getItem('auth_token_bodegaarcana')) {
      this.setUserSetting('isAuthenticated', true);
      const token: any = localStorage.getItem('auth_token_bodegaarcana');
      const decodeToken = this.helper.decodeToken(token);      
      this.setUserSetting('idUsuario', decodeToken.uid);
      this.setUserSetting('usuario', decodeToken.name);    
      return true;
    }
    else {
      return false;
    }
  }
}
