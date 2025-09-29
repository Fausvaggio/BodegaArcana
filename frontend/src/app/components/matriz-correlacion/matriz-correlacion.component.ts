import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { ApiVinosService } from '../../core/services/api-vinos.service';

@Component({
  selector: 'app-matriz-correlacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matriz-correlacion.component.html',
  styleUrls: ['./matriz-correlacion.component.css']
})
export class MatrizCorrelacionComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  datos: { x: string; y: string; value: number }[] = [];
  features: string[] = [];
  seleccionadas: string[] = [];
  usarAbsoluto: boolean = false;

  constructor(private api: ApiVinosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.api.matrizCorrelacion().subscribe((data: any) => {
      this.features = Object.keys(data);
      this.seleccionadas = [...this.features];

      this.datos = [];
      for (const f1 of this.features) {
        for (const f2 of this.features) {
          this.datos.push({ x: f1, y: f2, value: data[f1][f2] });
        }
      }

      this.renderChart();
    });
  }

  toggleFeature(f: string): void {
    if (this.seleccionadas.includes(f)) {
      this.seleccionadas = this.seleccionadas.filter(s => s !== f);
    } else {
      this.seleccionadas.push(f);
    }
    this.renderChart();
  }

  seleccionarTodo(): void {
    this.seleccionadas = [...this.features];
    this.renderChart();
  }

  limpiarTodo(): void {
    this.seleccionadas = [];
    this.renderChart();
  }

  toggleAbsoluto(): void {
    this.usarAbsoluto = !this.usarAbsoluto;
    this.renderChart();
  }

  private renderChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 750;
    const height = 750;

    d3.select(element).selectAll('*').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 120, right: 40, bottom: 40, left: 120 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const datosFiltrados = this.datos.filter(
      d => this.seleccionadas.includes(d.x) && this.seleccionadas.includes(d.y)
    );

    const x = d3
      .scaleBand()
      .domain(this.seleccionadas)
      .range([0, chartWidth])
      .padding(0.05);

    const y = d3
      .scaleBand()
      .domain(this.seleccionadas)
      .range([0, chartHeight])
      .padding(0.05);

    const color = d3
      .scaleSequential(d3.interpolateRdBu)
      .domain([1, -1]);

    g.selectAll()
      .data(datosFiltrados)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x)!)
      .attr('y', d => y(d.y)!)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => {
        const val = this.usarAbsoluto ? Math.abs(d.value) : d.value;
        return this.usarAbsoluto
          ? d3.interpolateBlues(val) // escala distinta para absolutos
          : color(val);
      })
      .append('title')
      .text(d => {
        const shown = this.usarAbsoluto ? Math.abs(d.value) : d.value;
        return `${d.x} vs ${d.y}: ${shown.toFixed(2)}`;
      });

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '11px');

    g.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll('text')
      .style('font-size', '11px');

    // Leyenda
    const legendHeight = 200;
    const legendWidth = 15;

    const defs = svg.append('defs');
    const linearGradient = defs
      .append('linearGradient')
      .attr('id', 'legend-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    if (this.usarAbsoluto) {
      for (let i = 0; i <= 100; i++) {
        linearGradient
          .append('stop')
          .attr('offset', `${i}%`)
          .attr('stop-color', d3.interpolateBlues(i / 100));
      }
    } else {
      const interpolator = d3.interpolateRdBu;
      for (let i = 0; i <= 100; i++) {
        linearGradient
          .append('stop')
          .attr('offset', `${i}%`)
          .attr('stop-color', interpolator(i / 100));
      }
    }

    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - margin.right - 40},${margin.top})`);

    legend
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#legend-gradient)');

    const legendScale = d3
      .scaleLinear()
      .domain(this.usarAbsoluto ? [0, 1] : [-1, 1])
      .range([legendHeight, 0]);

    const legendAxis = d3.axisRight(legendScale).ticks(5);

    legend
      .append('g')
      .attr('transform', `translate(${legendWidth},0)`)
      .call(legendAxis);
  }
}
