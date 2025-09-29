import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVinosService } from '../../core/services/api-vinos.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-importancia-caracteristicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './importancia-caracteristicas.component.html',
  styleUrls: ['./importancia-caracteristicas.component.css']
})
export class ImportanciaCaracteristicasComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  modelChoice: string = 'rf'; // modelo por defecto
  datos: { feature: string; importance: number }[] = [];

  modelosDisponibles = ['rf', 'xgb', 'svm'];

  constructor(private api: ApiVinosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.api.importanciaCaracteristicas(this.modelChoice).subscribe((data: any) => {
      this.datos = Object.entries(data).map(([feature, importance]) => ({
        feature,
        importance: Number(importance)
      }));

      this.datos.sort((a, b) => b.importance - a.importance);
      this.renderChart();
    });
  }

  private renderChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 750;
    const height = 450;

    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 30, bottom: 50, left: 140 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleBand()
      .domain(this.datos.map(d => d.feature))
      .range([0, chartHeight])
      .padding(0.2);

    const x = d3.scaleLinear()
      .domain([0, d3.max(this.datos, d => d.importance)!])
      .range([0, chartWidth]);

    g.append('g').call(d3.axisLeft(y));
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.selectAll('.bar')
      .data(this.datos)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => y(d.feature)!)
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('width', 0)
      .attr('fill', 'steelblue')
      .transition()
      .duration(1000)
      .attr('width', d => x(d.importance));

    g.selectAll('.label')
      .data(this.datos)
      .enter()
      .append('text')
      .attr('x', d => x(d.importance) + 5)
      .attr('y', d => y(d.feature)! + y.bandwidth() / 2 + 4)
      .attr('text-anchor', 'start')
      .style('font-size', '11px')
      .style('fill', '#333')
      .text(d => d.importance.toFixed(3));
  }
}
