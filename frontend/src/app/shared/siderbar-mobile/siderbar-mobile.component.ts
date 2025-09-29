import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../auth/settings/settings.service';
import { CargarScriptsService } from '../../core/services/cargar-scripts.service';
import { environment } from '../../../environments/environment';

const CLIENT_NAME = environment.clientName;

@Component({
  selector: 'app-siderbar-mobile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './siderbar-mobile.component.html',
  styleUrl: './siderbar-mobile.component.css'
})
export class SiderbarMobileComponent {
  
  clientName: string = CLIENT_NAME;
  tituloMenuMobile: string = 'dashboard';
  tituloSubMenuMobile: string = '';
  verConfiguraciones: boolean = true;  
  settings = inject(SettingsService);
  router = inject(Router);  
  cargarScriptsService = inject(CargarScriptsService);  
  constructor(
  ) {
 
  }
  ngOnInit(): void {    
    this.tituloMenuMobile =  localStorage.getItem('titulo_menu')?.toString()??'';
    this.tituloSubMenuMobile =  localStorage.getItem('subtitulo_menu')?.toString()??'';    
    
    
  }

  AsignarTituloMenu(titulo: string, tituloSubMenu: string,esLectura: boolean,esEscritura:boolean) {
    this.tituloMenuMobile = titulo;
    this.tituloSubMenuMobile = tituloSubMenu;
    localStorage.setItem('esLectura',esLectura.toString());
    localStorage.setItem('esEscritura',esEscritura.toString());
    localStorage.setItem('titulo_menu',titulo);
    localStorage.setItem('subtitulo_menu',tituloSubMenu);
  }

  CerrarSiderbarMobile(titulo: string, tituloSubMenu: string) {
    this.tituloMenuMobile = titulo;
    this.tituloSubMenuMobile = tituloSubMenu;
    let yourElem = <HTMLElement>document.querySelector('.mobile-menu-toggler');
    yourElem.click();
  }



   /// Autor: Dilman Abel Velasquez Huincho
  /// Fecha: 10/03/2025
  /// Versión: 1.0
  /// <summary>
  /// Ejecutar scripts para cargar el side bar
  /// </summary>
  EjecutarScripts() {
    this.cargarScriptsService.CargarArchivoJS('components/base/tippy.js', 'id-base-tippy');
    this.cargarScriptsService.CargarArchivoJS('components/base/lucide.js', 'id-base-lucide');
     this.cargarScriptsService.CargarArchivoJS('vendors/lucide.js', 'id-vendors-lucide');
     this.cargarScriptsService.CargarArchivoJS('themes/rubick.js', 'id-base-rubick');
  }

  

}
