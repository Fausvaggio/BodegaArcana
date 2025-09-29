import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiVinosService } from '../../core/services/api-vinos.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-vinos-similares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vinos-similares.component.html',
  styleUrls: ['./vinos-similares.component.css']
})
export class VinosSimilaresComponent {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  form!: FormGroup;
  similares: any[] = [];

  features = [
    { key: 'fixed_acidity', label: 'Acidez fija' },
    { key: 'volatile_acidity', label: 'Acidez volátil' },
    { key: 'citric_acid', label: 'Ácido cítrico' },
    { key: 'residual_sugar', label: 'Azúcar residual' },
    { key: 'chlorides', label: 'Cloruros' },
    { key: 'free_sulfur_dioxide', label: 'SO₂ libre' },
    { key: 'total_sulfur_dioxide', label: 'SO₂ total' },
    { key: 'density', label: 'Densidad' },
    { key: 'pH', label: 'pH' },
    { key: 'sulphates', label: 'Sulfatos' },
    { key: 'alcohol', label: 'Alcohol' },
    { key: 'wine_type', label: 'Tipo de vino' }
  ];

  constructor(private fb: FormBuilder, private api: ApiVinosService) {
    this.form = this.fb.group({
      fixed_acidity: [7],
      volatile_acidity: [0.27],
      citric_acid: [0.36],
      residual_sugar: [20.7],
      chlorides: [0.045],
      free_sulfur_dioxide: [45],
      total_sulfur_dioxide: [170],
      density: [1.001],
      pH: [3.0],
      sulphates: [0.45],
      alcohol: [8.8],
      wine_type: [1],
      featureX: ['alcohol'],
      featureY: ['volatile_acidity'],
      mostrarAvanzado: [false]   // 👈 switch para mostrar/ocultar
    });
  }

  buscarSimilares(): void {
    const vinoEntrada = this.form.value;
    const featureX = vinoEntrada.featureX;
    const featureY = vinoEntrada.featureY;

    this.api.vinosSimilares(vinoEntrada).subscribe(data => {
      this.similares = data;
      this.renderChart(this.similares, vinoEntrada, featureX, featureY);
    });
  }

  private renderChart(similares: any[], entrada: any, featureX: string, featureY: string): void {
    const element = this.chartContainer.nativeElement;
    const width = 600;
    const height = 400;

    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleLinear()
      .domain([
        d3.min([...similares, entrada], d => d[featureX])! * 0.95,
        d3.max([...similares, entrada], d => d[featureX])! * 1.05
      ])
      .range([60, width - 40]);

    const y = d3.scaleLinear()
      .domain([
        d3.min([...similares, entrada], d => d[featureY])! * 0.95,
        d3.max([...similares, entrada], d => d[featureY])! * 1.05
      ])
      .range([height - 50, 40]);

    // Ejes
    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(60, 0)`)
      .call(d3.axisLeft(y));

    // Labels de ejes
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .text(this.features.find(f => f.key === featureX)?.label ?? featureX);

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(this.features.find(f => f.key === featureY)?.label ?? featureY);

    // Vino de entrada
    svg.append('circle')
      .attr('cx', x(entrada[featureX]))
      .attr('cy', y(entrada[featureY]))
      .attr('r', 8)
      .attr('fill', 'red');

    // Similares
    svg.selectAll('circle.similares')
      .data(similares)
      .enter()
      .append('circle')
      .attr('class', 'similares')
      .attr('cx', d => x(d[featureX]))
      .attr('cy', d => y(d[featureY]))
      .attr('r', 6)
      .attr('fill', 'steelblue')
      .append('title')
      .text(d => `${featureX}: ${d[featureX]}, ${featureY}: ${d[featureY]}, Calidad: ${d.quality}`);
  }
}
