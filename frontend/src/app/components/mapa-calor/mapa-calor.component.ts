import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVinosService } from '../../core/services/api-vinos.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-mapa-calor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mapa-calor.component.html',
  styleUrls: ['./mapa-calor.component.css']
})
export class MapaCalorComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  datos: { quality: number; feature: string; value: number }[] = [];
  features: string[] = [];
  calidades: number[] = [];
  seleccionadas: string[] = [];

  constructor(private api: ApiVinosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.api.mapaCalor().subscribe((data: any) => {
      this.calidades = Object.keys(data).map(k => +k);
      this.features = Object.keys(data[this.calidades[0]]);
      this.seleccionadas = [...this.features]; // por defecto todas

      this.datos = [];
      for (const [q, valores] of Object.entries(data)) {
        for (const [f, v] of Object.entries(valores as any)) {
          this.datos.push({
            quality: +q,
            feature: f,
            value: Number(v)
          });
        }
      }

      this.renderChart();
    });
  }

  toggleFeature(feature: string): void {
    if (this.seleccionadas.includes(feature)) {
      this.seleccionadas = this.seleccionadas.filter(f => f !== feature);
    } else {
      this.seleccionadas.push(feature);
    }
    this.renderChart();
  }

  private renderChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 800;
    const height = 450;

    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 50, right: 20, bottom: 100, left: 80 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const datosFiltrados = this.datos.filter(d => this.seleccionadas.includes(d.feature));

    const x = d3.scaleBand()
      .domain(this.seleccionadas)
      .range([0, chartWidth])
      .padding(0.05);

    const y = d3.scaleBand()
      .domain(this.calidades.map(String))
      .range([0, chartHeight])
      .padding(0.05);

    const maxVal = d3.max(datosFiltrados, d => d.value)!;
    const color = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, maxVal]);

    g.selectAll()
      .data(datosFiltrados)
      .enter()
      .append('rect')
      .attr('x', d => x(d.feature)!)
      .attr('y', d => y(d.quality.toString())!)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => color(d.value))
      .append('title')
      .text(d => `Calidad: ${d.quality}, ${d.feature}: ${d.value.toFixed(2)}`);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '11px');

    g.append('g').call(d3.axisLeft(y));

    const legendHeight = 150;
    const legendWidth = 15;

    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right - 40},${margin.top})`);

    const legendScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([legendHeight, 0]);

    const legendAxis = d3.axisRight(legendScale).ticks(6);

    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    const interpolator = d3.interpolateYlOrRd;
    for (let i = 0; i <= 100; i++) {
      linearGradient.append('stop')
        .attr('offset', `${i}%`)
        .attr('stop-color', interpolator(i / 100));
    }

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)');

    legend.append('g')
      .attr('transform', `translate(${legendWidth},0)`)
      .call(legendAxis);
  }
}
