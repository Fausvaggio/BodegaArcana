import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { ApiVinosService } from '../../core/services/api-vinos.service';

interface Stats {
  mean: number;
  min: number;
  max: number;
  std: number;
  count?: number;
}

@Component({
  selector: 'app-estadisticas-dataset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas-dataset.component.html',
  styleUrls: ['./estadisticas-dataset.component.css']
})
export class EstadisticasDatasetComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  stats: { [feature: string]: Stats } = {};
  features: string[] = [];

  constructor(private api: ApiVinosService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.api.stats().subscribe((data: any) => {
      this.stats = data;
      this.features = Object.keys(data);
      this.renderChart();
    });
  }

  private renderChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 900;
    const height = 500;

    d3.select(element).selectAll('*').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 30, right: 40, bottom: 120, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Datos para boxplot: min, max, mean ± std
    const dataBox = this.features.map(f => {
      const s = this.stats[f];
      return {
        feature: f,
        min: s.min,
        max: s.max,
        mean: s.mean,
        low: s.mean - s.std,
        high: s.mean + s.std
      };
    });

    const x = d3
      .scaleBand()
      .domain(this.features)
      .range([0, chartWidth])
      .padding(0.4);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(dataBox, d => d.min)!,
        d3.max(dataBox, d => d.max)!
      ])
      .nice()
      .range([chartHeight, 0]);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '11px');

    g.append('g').call(d3.axisLeft(y));

    // Boxplot básico (min - max)
    g.selectAll('.line-minmax')
      .data(dataBox)
      .enter()
      .append('line')
      .attr('x1', d => x(d.feature)! + x.bandwidth() / 2)
      .attr('x2', d => x(d.feature)! + x.bandwidth() / 2)
      .attr('y1', d => y(d.min))
      .attr('y2', d => y(d.max))
      .attr('stroke', '#999');

    // Rectángulo = mean ± std
    g.selectAll('.box')
      .data(dataBox)
      .enter()
      .append('rect')
      .attr('x', d => x(d.feature)!)
      .attr('y', d => y(d.high))
      .attr('width', x.bandwidth())
      .attr('height', d => y(d.low) - y(d.high))
      .attr('fill', '#90caf9')
      .attr('stroke', '#1976d2');

    // Línea en la media
    g.selectAll('.mean')
      .data(dataBox)
      .enter()
      .append('line')
      .attr('x1', d => x(d.feature)!)
      .attr('x2', d => x(d.feature)! + x.bandwidth())
      .attr('y1', d => y(d.mean))
      .attr('y2', d => y(d.mean))
      .attr('stroke', '#d32f2f')
      .attr('stroke-width', 2);

    // Tooltips
    g.selectAll<SVGRectElement, any>('.box')
      .append('title')
      .text((d: any) =>
        `${d.feature}
     Min: ${d.min}
     Max: ${d.max}
     Media: ${d.mean.toFixed(2)}
     ±STD: ${this.stats[d.feature].std.toFixed(2)}`
      );

  }
}
