import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiVinosService } from '../../core/services/api-vinos.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-distribucion-calidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './distribucion-calidad.component.html',
  styleUrls: ['./distribucion-calidad.component.css']
})

export class DistribucionCalidadComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  datos: { quality: number; tinto: number; blanco: number }[] = [];
  mostrarPorcentaje = false;

  constructor(private api: ApiVinosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  toggleVista(): void {
    this.mostrarPorcentaje = !this.mostrarPorcentaje;
    this.renderChart();
  }

  cargarDatos(): void {
    this.api.distribucionCalidadPorTipo().subscribe(data => {
      this.datos = Object.entries(data).map(([quality, valores]: any) => ({
        quality: +quality,
        tinto: Number(valores.tinto) || 0,
        blanco: Number(valores.blanco) || 0
      }));
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

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const subgroups = ['tinto', 'blanco'];
    const groups = this.datos.map(d => d.quality.toString());

    const totals = this.datos.map(d => d.tinto + d.blanco);
    const totalGeneral = d3.sum(totals);

    const datosTransformados = this.datos.map(d => {
      if (this.mostrarPorcentaje) {
        return {
          quality: d.quality,
          tinto: (d.tinto / totalGeneral) * 100,
          blanco: (d.blanco / totalGeneral) * 100
        };
      }
      return d;
    });

    const x = d3.scaleBand()
      .domain(groups)
      .range([0, chartWidth])
      .padding(0.2);

    const xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(datosTransformados, d => Math.max(d.tinto, d.blanco))!])
      .range([chartHeight, 0]);

    const color = d3.scaleOrdinal<string>()
      .domain(subgroups)
      .range(['#e41a1c', '#377eb8']);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d =>
        this.mostrarPorcentaje ? d + "%" : d.toString()
      ));

    const barras = g.append('g')
      .selectAll('g')
      .data(datosTransformados)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${x(d.quality.toString())},0)`);

    barras.selectAll('rect')
      .data(d => subgroups.map(key => ({ key, value: (d as any)[key], quality: d.quality })))
      .enter()
      .append('rect')
      .attr('x', d => xSubgroup(d.key)!)
      .attr('width', xSubgroup.bandwidth())
      .attr('y', chartHeight)
      .attr('height', 0)
      .attr('fill', d => color(d.key) as string)
      .transition()
      .duration(1000)
      .attr('y', d => y(d.value))
      .attr('height', d => chartHeight - y(d.value));

    barras.selectAll('text')
      .data(d => subgroups.map(key => ({ key, value: (d as any)[key], quality: d.quality })))
      .enter()
      .append('text')
      .attr('x', d => xSubgroup(d.key)! + xSubgroup.bandwidth() / 2)
      .attr('y', chartHeight - 5)
      .attr('text-anchor', 'middle')
      .style('fill', '#333')
      .style('font-size', '11px')
      .transition()
      .duration(1000)
      .attr('y', d => y(d.value) - 5)
      .text(d => this.mostrarPorcentaje ? d.value.toFixed(1) + "%" : d.value);

    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, 30)`);

    subgroups.forEach((key, i) => {
      legend.append('rect')
        .attr('x', 0)
        .attr('y', i * 20)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(key) as string);

      legend.append('text')
        .attr('x', 20)
        .attr('y', i * 20 + 12)
        .text(key.charAt(0).toUpperCase() + key.slice(1));
    });
  }
}

