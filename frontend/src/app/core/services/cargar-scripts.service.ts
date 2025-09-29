import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  constructor() { }

  CargarArchivoJS(rutaArchivo: string, nameId: string) {
    let body = document.getElementsByTagName('body')[0];
    let old_script = document.getElementById(nameId);
    let script = document.createElement("script");
    script.src = `./dist/js/${rutaArchivo}`;
    script.id = nameId;
    if (old_script != null) {
      body.removeChild(old_script);
    }
    body.appendChild(script);
  }

}
