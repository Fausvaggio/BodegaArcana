import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../auth/settings/settings.service';
import { CargarScriptsService } from '../../core/services/cargar-scripts.service';
import { environment } from '../../../environments/environment';

const CLIENT_NAME = environment.clientName;

@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.css',
})
export class SiderbarComponent {
  clientName: string = CLIENT_NAME;
  tituloMenu: string = 'dashboard';    
  tituloSubMenu: string = '';      
  settings = inject(SettingsService);
  router = inject(Router);
  cargarScriptsService = inject(CargarScriptsService);  
  constructor(
  ) {

   
  }
  ngOnInit(): void {
    this.tituloMenu = localStorage.getItem('titulo_menu')?.toString() ?? '';
    this.tituloSubMenu =
      localStorage.getItem('subtitulo_menu')?.toString() ?? '';   
  }

  AsignarTituloMenu(titulo: string, tituloSubMenu: string) {
    this.tituloMenu = titulo;
    this.tituloSubMenu = tituloSubMenu;

    localStorage.setItem('titulo_menu', titulo);
    localStorage.setItem('subtitulo_menu', tituloSubMenu);
  }

  /// Autor: Dilman Abel Velasquez Huincho
  /// Fecha: 10/03/2025
  /// Versión: 1.0
  /// <summary>
  /// Ejecutar scripts para cargar el side bar mobile
  /// </summary>
  EjecutarScripts() {
    this.cargarScriptsService.CargarArchivoJS(
      'components/base/tippy.js',
      'id-base-tippy'
    );
    this.cargarScriptsService.CargarArchivoJS(
      'components/base/lucide.js',
      'id-base-lucide'
    );
    this.cargarScriptsService.CargarArchivoJS(
      'vendors/lucide.js',
      'id-vendors-lucide'
    );
    this.cargarScriptsService.CargarArchivoJS(
      'themes/rubick.js',
      'id-base-rubick'
    );
  }
}
