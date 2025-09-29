import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVinosService } from '../../core/services/api-vinos.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-relaciones-calidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relaciones-calidad.component.html',
  styleUrls: ['./relaciones-calidad.component.css']
})
export class RelacionesCalidadComponent implements OnInit {
  @ViewChild('barChart', { static: true }) barChartContainer!: ElementRef;
  calidad1: number = 5;
  calidad2: number = 7;
  datos: { feature: string; v1: number; v2: number }[] = [];

  constructor(private api: ApiVinosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.api.relacionesCalidad(this.calidad1).subscribe((data1: any) => {
      const datos1 = Object.entries(data1).map(([feature, value]) => ({
        feature,
        v1: Number(value),
        v2: 0
      }));

      this.api.relacionesCalidad(this.calidad2).subscribe((data2: any) => {
        const datos2 = Object.fromEntries(
          Object.entries(data2).map(([f, v]) => [f, Number(v)])
        );

        this.datos = datos1.map(d => ({
          feature: d.feature,
          v1: d.v1,
          v2: datos2[d.feature] || 0
        }));

        this.renderChart();
      });
    });
  }

  private renderChart(): void {
    const element = this.barChartContainer.nativeElement;
    const width = 800;
    const height = 450;

    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 40, bottom: 50, left: 140 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleBand()
      .domain(this.datos.map(d => d.feature))
      .range([0, chartHeight])
      .padding(0.3);

    const x = d3.scaleLinear()
      .domain([0, d3.max(this.datos, d => Math.max(d.v1, d.v2))!])
      .range([0, chartWidth]);

    g.append('g').call(d3.axisLeft(y));
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    const grupos = g.selectAll('.grupo')
      .data(this.datos)
      .enter()
      .append('g')
      .attr('transform', d => `translate(0,${y(d.feature)})`);

    const barHeight = y.bandwidth() / 2;

    grupos.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', barHeight - 2)
      .attr('width', 0)
      .attr('fill', 'steelblue')
      .transition()
      .duration(1000)
      .attr('width', d => x(d.v1));

    grupos.append('rect')
      .attr('x', 0)
      .attr('y', barHeight)
      .attr('height', barHeight - 2)
      .attr('width', 0)
      .attr('fill', 'crimson')
      .transition()
      .duration(1000)
      .attr('width', d => x(d.v2));

    grupos.append('text')
      .attr('x', d => x(d.v1) + 5)
      .attr('y', barHeight / 2 + 4)
      .style('font-size', '11px')
      .style('fill', '#333')
      .text(d => d.v1.toFixed(2));

    grupos.append('text')
      .attr('x', d => x(d.v2) + 5)
      .attr('y', barHeight + barHeight / 2 + 4)
      .style('font-size', '11px')
      .style('fill', '#333')
      .text(d => d.v2.toFixed(2));

    const legend = svg.append('g')
      .attr('transform', `translate(${width - 200}, 30)`);

    const legendData = [
      { label: `Calidad ${this.calidad1}`, color: 'steelblue' },
      { label: `Calidad ${this.calidad2}`, color: 'crimson' }
    ];

    legendData.forEach((d, i) => {
      legend.append('rect')
        .attr('x', 0)
        .attr('y', i * 20)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d.color);

      legend.append('text')
        .attr('x', 20)
        .attr('y', i * 20 + 12)
        .text(d.label);
    });
  }
}
