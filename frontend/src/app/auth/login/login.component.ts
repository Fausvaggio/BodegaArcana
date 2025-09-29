import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { LoginService } from '../../core/services/login.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoginRequestDTO } from '../../core/dtos/dtos-general/login-request';
import { CargarScriptsService } from '../../core/services/cargar-scripts.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

const CLIENT_NAME = environment.clientName;
const CLIENT_LOGO = environment.clientLogo;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  clientName: string = CLIENT_NAME;
  clientLogo: string = CLIENT_LOGO;
  dataFormGroup: FormGroup;
  spinner = inject(NgxSpinnerService);
  loginService = inject(LoginService);
  settings = inject(SettingsService);
  cargarScriptsService = inject(CargarScriptsService);

  constructor(private router: Router) {
    this.dataFormGroup = new FormGroup({
      inputUsuario: new FormControl('', [Validators.required]),
      inputPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('auth_token_bodegaarcana');
    localStorage.removeItem('titulo_menu');
    localStorage.removeItem('subtitulo_menu');
    this.EjecutarScripts();
    this.EliminarElementosPorClase('dropdown-menu');
    this.CargarComponent();
  }

  EjecutarScripts() {
    this.cargarScriptsService.CargarArchivoJS('components/base/tippy.js', 'id-base-tippy');
    this.cargarScriptsService.CargarArchivoJS('components/base/lucide.js', 'id-base-lucide');
  }

  SubmitForm1($ev: any, value: any) {
    $ev.preventDefault();
    for (let c in this.dataFormGroup.controls) {
      this.dataFormGroup.controls[c].markAsTouched();
    }
    if (this.dataFormGroup.valid) {


      this.router.navigateByUrl("/dashboard");

    }
  }

  SubmitForm($ev: any, value: any) {
    $ev.preventDefault();
    for (let c in this.dataFormGroup.controls) {
      this.dataFormGroup.controls[c].markAsTouched();
    }
    if (this.dataFormGroup.valid) {
      this.spinner.show().then();
      let dataLogin = new LoginRequestDTO();
      dataLogin.Username = value.inputUsuario;
      dataLogin.Password = value.inputPassword;
      this.loginService.LoginUsuarios(dataLogin)
        .subscribe({
          next: (data) => {
            if (data != null) {
              console.log(data);
              this.settings.setUserSetting('isAuthenticated', true);
              this.settings.setUserSetting('idUsuario', data.idUsuario);
              this.settings.setUserSetting('nombres', data.nombres);
              this.settings.setUserSetting('apellidoPaterno', data.apellidoPaterno);
              this.settings.setUserSetting('apellidoMaterno', data.apellidoMaterno);
              this.settings.setUserSetting('idRol', data.idRol);
              this.settings.setUserSetting('idTipoDocumento', data.idTipoDocumento);
              this.settings.setUserSetting('numeroDocumento', data.numeroDocumento);
              this.router.navigateByUrl("/dashboard");
            }
            else {
              this.settings.setUserSetting('isAuthenticated', false);
              this.settings.setUserSetting('idUsuario', '');
              this.settings.setUserSetting('nombres', '');
              this.settings.setUserSetting('apellidoPaterno', '');
              this.settings.setUserSetting('apellidoMaterno', '');
              this.settings.setUserSetting('idRol', []);
              this.settings.setUserSetting('idTipoDocumento', '');
              this.settings.setUserSetting('numeroDocumento', '');
            }
          },
          error: (e) => {
            console.log(e);
            if (e.status == '400') {
              this.MostrarNotificacionError(e.error, '¡Error en la verificación!');
            } else {
              this.MostrarNotificacionError(e.error.detail, '¡Error en la verificación!');
            }
            this.spinner.hide().then();
          },
          complete: () => { this.spinner.hide().then(); }
        });
    }
  }

  /// Autor: Fausto Danilo Esthela Espinoza
  /// Fecha: 11/04/2024
  /// Versión: 1.0
  /// <summary>
  ///  Permite resumir al control para el interfaz.
  /// </summary>
  get Controls() {
    return this.dataFormGroup.controls;
  }

  MostrarNotificacionError(mensaje: string, titulo: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      html: `<div class="message-text-error">${mensaje} </div>`,
    });
  }

  EliminarElementosPorClase(nameClass: string) {
    let body = document.getElementsByTagName('body')[0];
    let className = document.getElementsByClassName(nameClass);
    console.log(className.length);
    for (let index = 0; index < className.length; index++) {
      body.removeChild(className[index]);

    }
  }

  CargarComponent() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    
  }

}
