import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiVinosService {

  constructor(private http: HttpClient) { }

  // ---------- PREDICCIONES ----------
  predecir(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/predict`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // ---------- ANALYSIS ----------
  vinosSimilares(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/analysis/find_similar`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // ---------- DASHBOARD ----------
  stats(): Observable<any> {
    return this.http.get(`${API_URL}/api/dashboard/stats`);
  }

  matrizCorrelacion(): Observable<any> {
    return this.http.get(`${API_URL}/api/dashboard/correlation_matrix`);
  }

  // ---------- EXPLICABILIDAD (XAI) ----------
  importanciaCaracteristicas(model: string): Observable<any> {
    return this.http.get(`${API_URL}/api/explain/feature_importance/${model}`);
  }

  explicarPrediccion(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/explain/explain_prediction`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // ---------- PATRONES ----------
  distribucionCalidad(): Observable<any> {
    return this.http.get(`${API_URL}/api/patterns/quality_distribution`);
  }

  relacionesCalidad(quality: number): Observable<any> {
    return this.http.get(`${API_URL}/api/patterns/quality_relationships/${quality}`);
  }

  caracteristicaVsCalidad(feature: string): Observable<any> {
    return this.http.get(`${API_URL}/api/patterns/feature_vs_quality/${feature}`);
  }

  mapaCalor(): Observable<any> {
    return this.http.get(`${API_URL}/api/patterns/heatmap`);
  }

  distribucionCalidadPorTipo() {
    return this.http.get(`${API_URL}/api/patterns/quality_distribution_by_type`);
  }

}
