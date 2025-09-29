import { Injectable } from '@angular/core';
import { ComboDTO } from '../dtos/dtos-general/combo';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {  
  comboTamanoPaginacion: ComboDTO[] = [{ 'id': 5, 'nombre': '5' }, { 'id': 10, 'nombre': '10' }, { 'id': 15, 'nombre': '15' }, { 'id': 20, 'nombre': '20' }, { 'id': 50, 'nombre': '50' }, { 'id': 100, 'nombre': '100' }];



  constructor() { }
  ObtenerTamanoPaginacion(): ComboDTO[] {
    return this.comboTamanoPaginacion;
  }   
}
