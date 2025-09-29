import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { ApiVinosService } from '../../core/services/api-vinos.service';

interface WineParams {
  alcohol: number;
  chlorides: number;
  citric_acid: number;
  density: number;
  fixed_acidity: number;
  free_sulfur_dioxide: number;
  total_sulfur_dioxide: number;
  pH: number;
  residual_sugar: number;
  sulphates: number;
  volatile_acidity: number;
  wine_type: number;
  model_choice: string;
}

@Component({
  selector: 'app-prediccion-vino',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prediccion-vino.component.html',
  styleUrls: ['./prediccion-vino.component.css']
})
export class PrediccionVinoComponent {
  resultado: string | null = null;

  parametros: WineParams = {
    alcohol: 8.5,
    chlorides: 0.045,
    citric_acid: 0.3,
    density: 0.995,
    fixed_acidity: 7,
    free_sulfur_dioxide: 30,
    total_sulfur_dioxide: 100,
    pH: 3.2,
    residual_sugar: 5,
    sulphates: 0.5,
    volatile_acidity: 0.3,
    wine_type: 1,
    model_choice: 'rf'
  };

  constructor(private api: ApiVinosService) { }

  getParametro(key: string): number | string {
    return this.parametros[key as keyof WineParams];
  }

  setParametro(key: string, value: number | string): void {
    this.parametros[key as keyof WineParams] = value as never;
  }

  predecir(): void {
    this.api.predecir(this.parametros).subscribe((resp: any) => {
      this.resultado = resp.prediction;
      this.renderResultado();
    });
  }

  renderResultado(): void {
    const element = document.getElementById('chart');
    if (!element) return;
    d3.select(element).selectAll('*').remove();

    const width = 300, height = 200;
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    let color = '#ffca28'; // Amarillo por defecto
    const pred = this.resultado?.toLowerCase();
    console.log(pred)
    if (pred === 'alta') color = '#388e3c';
    if (pred === 'baja') color = '#d32f2f';

    // Capitalizar la primera letra
    const texto = pred
      ? pred.charAt(0).toUpperCase() + pred.slice(1)
      : '';

    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 60)
      .attr('fill', color);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2 + 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('fill', 'white')
      .text(texto);
  }


  esNumero(valor: any): boolean {
    return typeof valor === 'number';
  }


}
