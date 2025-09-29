import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVinosService } from '../../core/services/api-vinos.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-caracteristica-vs-calidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caracteristica-vs-calidad.component.html',
  styleUrls: ['./caracteristica-vs-calidad.component.css']
})
export class CaracteristicaVsCalidadComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  featuresSeleccionadas: string[] = ['alcohol']; // por defecto una
  datos: { quality: number; [key: string]: number }[] = [];

  featuresDisponibles: string[] = [
    'alcohol',
    'chlorides',
    'citric_acid',
    'density',
    'fixed_acidity',
    'free_sulfur_dioxide',
    'pH',
    'residual_sugar',
    'sulphates',
    'total_sulfur_dioxide',
    'volatile_acidity'
  ];

  colores = d3.scaleOrdinal(d3.schemeCategory10).domain(this.featuresDisponibles);

  constructor(private api: ApiVinosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // cargamos cada característica seleccionada y fusionamos por calidad
    const peticiones = this.featuresSeleccionadas.map(f =>
      this.api.caracteristicaVsCalidad(f).toPromise()
    );

    Promise.all(peticiones).then(resultados => {
      const merged: Record<number, any> = {};

      resultados.forEach((data: any, idx) => {
        const feature = this.featuresSeleccionadas[idx];
        Object.entries(data).forEach(([quality, value]) => {
          const q = +quality;
          if (!merged[q]) merged[q] = { quality: q };
          merged[q][feature] = Number(value);
        });
      });

      this.datos = Object.values(merged).sort((a: any, b: any) => a.quality - b.quality);
      this.renderChart();
    });
  }

  private renderChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 750;
    const height = 420;

    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 150, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(this.datos, d => d.quality) as [number, number])
      .range([0, chartWidth]);

    const maxVal = d3.max(this.datos.flatMap(d =>
      this.featuresSeleccionadas.map(f => d[f] || 0)
    ))!;

    const y = d3.scaleLinear()
      .domain([0, maxVal])
      .range([chartHeight, 0]);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).ticks(this.datos.length).tickFormat(d3.format('d')));

    g.append('g').call(d3.axisLeft(y));

    const line = d3.line<any>()
      .x(d => x(d.quality))
      .y((d: any) => y(d.value));

    this.featuresSeleccionadas.forEach(feature => {
      const color = this.colores(feature) as string;
      const datosFeature = this.datos.map(d => ({ quality: d.quality, value: d[feature] }));

      g.append('path')
        .datum(datosFeature)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', line);

      g.selectAll(`.circle-${feature}`)
        .data(datosFeature)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.quality))
        .attr('cy', d => y(d.value))
        .attr('r', 4)
        .attr('fill', color)
        .append('title')
        .text(d => `${feature} | Calidad: ${d.quality}, Promedio: ${d.value.toFixed(2)}`);
    });

    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, 40)`);

    this.featuresSeleccionadas.forEach((f, i) => {
      legend.append('rect')
        .attr('x', 0)
        .attr('y', i * 20)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', this.colores(f) as string);

      legend.append('text')
        .attr('x', 20)
        .attr('y', i * 20 + 12)
        .text(f);
    });
  }
}
