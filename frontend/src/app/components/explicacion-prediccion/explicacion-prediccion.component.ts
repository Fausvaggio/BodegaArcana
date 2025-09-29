import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { ApiVinosService } from '../../core/services/api-vinos.service';

type ShapItem = { feature: string; value: number };

@Component({
  selector: 'app-explicacion-prediccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './explicacion-prediccion.component.html',
  styleUrls: ['./explicacion-prediccion.component.css']
})
export class ExplicacionPrediccionComponent {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  form: FormGroup;
  cargando = false;

  // Resumen devuelto por el backend
  prediction?: number | string;
  expectedValue?: number;
  model?: string;

  // Datos para el gráfico
  shapData: ShapItem[] = [];

  constructor(private fb: FormBuilder, private api: ApiVinosService) {
    // payload de ejemplo (ajústalo a tus claves reales)
    const ejemplo = {
      alcohol: 10.2,
      chlorides: 0.045,
      citric_acid: 0.36,
      density: 0.996,
      fixed_acidity: 7.0,
      free_sulfur_dioxide: 30,
      pH: 3.2,
      residual_sugar: 6.0,
      sulphates: 0.58,
      total_sulfur_dioxide: 130,
      volatile_acidity: 0.35,
      wine_type: 0,
      model_choice: 'rf'
    };

    this.form = this.fb.group({
      payload: [JSON.stringify(ejemplo, null, 2)]
    });
  }

  explicar(): void {
    this.cargando = true;
    this.prediction = undefined;
    this.expectedValue = undefined;
    this.model = undefined;
    this.shapData = [];
    d3.select(this.chartContainer?.nativeElement).selectAll('*').remove();

    let body: any;
    try {
      body = JSON.parse(this.form.value.payload);
    } catch {
      this.cargando = false;
      alert('JSON inválido.');
      return;
    }

    this.api.explicarPrediccion(body).subscribe({
      next: (resp: any) => {
        // Formatos típicos:
        // { prediction, expected_value/base_value, shap_values: {feature: value, ...}, model }
        const shapDict = resp.shap_values || resp.shap || resp.explanations || {};
        this.prediction = resp.prediction ?? resp.output ?? resp.label;
        this.expectedValue = resp.expected_value ?? resp.base_value;
        this.model = resp.model ?? body.model_choice ?? 'modelo';

        this.shapData = Object.entries(shapDict)
          .map(([feature, value]) => ({ feature, value: Number(value) }))
          .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

        this.renderChart();
      },
      error: (e) => {
        console.error(e);
        alert('No se pudo obtener la explicación. Revisa el payload y el backend.');
      },
      complete: () => (this.cargando = false)
    });
  }

  private renderChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 860;
    const barHeight = 26;
    const height = Math.max(260, this.shapData.length * (barHeight + 6) + 100);

    d3.select(element).selectAll('*').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 40, bottom: 40, left: 180 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const minVal = d3.min(this.shapData, d => d.value)!;
    const maxVal = d3.max(this.shapData, d => d.value)!;
    const absMax = Math.max(Math.abs(minVal || 0), Math.abs(maxVal || 0)) || 1;

    const x = d3
      .scaleLinear()
      .domain([-absMax, absMax])
      .range([0, chartWidth]);

    const y = d3
      .scaleBand()
      .domain(this.shapData.map(d => d.feature))
      .range([0, chartHeight])
      .padding(0.2);

    // Eje X (valor SHAP)
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', chartWidth / 2)
      .attr('y', 35)
      .attr('fill', '#333')
      .attr('text-anchor', 'middle')
      .text('Contribución SHAP (− reduce | + aumenta)');

    // Eje Y (features)
    g.append('g').call(d3.axisLeft(y));

    // Línea vertical en 0
    g.append('line')
      .attr('x1', x(0))
      .attr('x2', x(0))
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('stroke', '#999')
      .attr('stroke-dasharray', '4 4');

    // Barras divergentes
    const grupos = g
      .selectAll('.bar-group')
      .data(this.shapData)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', d => `translate(0,${y(d.feature)})`);

    grupos
      .append('rect')
      .attr('x', d => x(Math.min(0, d.value)))
      .attr('width', d => Math.abs(x(d.value) - x(0)))
      .attr('y', 0)
      .attr('height', y.bandwidth())
      .attr('fill', d => (d.value >= 0 ? '#2e7d32' : '#c62828'))
      .append('title')
      .text(d => `${d.feature}: ${d.value.toFixed(3)}`);

    // Etiquetas numéricas al final de la barra
    grupos
      .append('text')
      .attr('x', d => (d.value >= 0 ? x(d.value) + 4 : x(d.value) - 4))
      .attr('y', y.bandwidth() / 2 + 4)
      .attr('text-anchor', d => (d.value >= 0 ? 'start' : 'end'))
      .attr('fill', '#333')
      .style('font-size', '11px')
      .text(d => d.value.toFixed(3));

    // Encabezado/resumen
    const header = svg.append('g').attr('transform', `translate(12, 10)`);
    const predTxt = `Predicción: ${this.prediction ?? '—'}`;
    const baseTxt = this.expectedValue != null ? `Valor esperado/base: ${this.expectedValue}` : '';
    const modelTxt = `Modelo: ${this.model ?? '—'}`;

    header
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '1em')
      .style('font-weight', 600)
      .text(predTxt);

    header
      .append('text')
      .attr('x', 0)
      .attr('y', 18)
      .attr('dy', '1em')
      .text(baseTxt);

    header
      .append('text')
      .attr('x', 0)
      .attr('y', 36)
      .attr('dy', '1em')
      .text(modelTxt);
  }
}
