import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../auth/settings/settings.service';
import { CargarScriptsService } from '../../core/services/cargar-scripts.service';



@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxSpinnerModule, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {


  usuario: string = '';
  idUsuario: string = '';
  idTipoUsuario: any;
  settings = inject(SettingsService);
  spinner = inject(NgxSpinnerService);
  cargarScriptsService = inject(CargarScriptsService);
  soundEnabled: boolean = false;
  
  

  constructor() {
    
  }

  ngOnInit(): void {
    this.usuario = `${this.settings.getUserSetting('usuario')}`;    
    this.EjecutarScripts();
  }

 
  EjecutarScripts() {
    this.cargarScriptsService.CargarArchivoJS('components/base/lucide.js', 'id-base-lucide');
    this.cargarScriptsService.CargarArchivoJS('components/mobile-menu.js', 'id-mobile');
    this.cargarScriptsService.CargarArchivoJS('vendors/transition.js', 'id-transition');
    this.cargarScriptsService.CargarArchivoJS('themes/rubick.js', 'id-rubick');
    this.cargarScriptsService.CargarArchivoJS('vendors/dropdown.js', 'id-dropdown');
    this.cargarScriptsService.CargarArchivoJS('vendors/popper.js', 'id-popper');
  }
  

  CerrarToolBar() {
    let yourElem = <HTMLElement>document.querySelector('body');
    yourElem.click();
  }

  // Autor: Fausto Danilo Esthela Espinoza
  // Fecha: 03/07/2024
  // Versión: 1.0
  // <summary>
  //  Permite manejar los errores de guardar.
  // </summary>
  ManejadorMensajeErrores(e: any) {
    if (typeof e != "string") {
      let error = e;
      let arrayErrores: any[] = [];
      let errorValidacion = Object.keys(e);
      if (Array.isArray(errorValidacion)) {
        errorValidacion.forEach((propiedadConError: any) => {
          if (Array.isArray(error[propiedadConError])) {
            error[propiedadConError].forEach((mensajeError: any) => {
              if (mensajeError['Message'] != null) {
                if (!arrayErrores.includes(mensajeError['Message'])) {
                  arrayErrores.push(mensajeError['Message']);
                }
              }
              else if (mensajeError['mensaje'] != null) {
                if (!arrayErrores.includes(mensajeError['mensaje'])) {
                  arrayErrores.push(mensajeError['mensaje']);
                }
              }
            });
          }
          else {
            arrayErrores.push(error[propiedadConError]);
          }
        });
        this.MostrarNotificacionError('¡ERROR EN EL PROCESO!', arrayErrores.join("<br/>"));
      } else {
        this.MostrarNotificacionError("", '¡ERROR EN EL PROCESO!');
      }
    }
    else {
      this.MostrarNotificacionError('¡ERROR EN EL PROCESO!', e);
    }
  }

  MostrarNotificacionError(titulo: string, mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      html: `<div class="message-text-error">${mensaje} </div>`,
    });
  }

}
