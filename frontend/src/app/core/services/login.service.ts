import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ValoresTokenEnum } from '../enum/valores-token';
import { catchError, map, retry, switchMap, timeout } from 'rxjs/operators';
import { LoginRequestDTO } from '../dtos/dtos-general/login-request';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";

const API_URL = environment.apiURL;

const API_URL_PRINCIPAL = environment.apiURLPrincipal;

interface AuthResponse {
  access_token: string;
  token_type: string; // bearer
}

interface MeOut {
  id: number;
  correoElectronico: string;
  numeroDocumento: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string | null;
  esActivo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  helper = new JwtHelperService();
  public nTimeout: number = 20000;
  public nRetry: number = 0;
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A ocurrido un error :', error.error.message);
    } else {
      console.error(
        'El servidor retornó el código, ' + error.status);
    }
    return throwError(() => error.error);
  };
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  datosUsuario: IUsuario = {
    idUsuario: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    idRol: [],
    idTipoDocumento: '',
    numeroDocumento: ''
  }
  constructor(private http: HttpClient) { }


 LoginUsuarios(data: LoginRequestDTO): Observable<any> {
  const body = {
    username: data.Username,
    password: data.Password
  };

  const urlLogin = `${API_URL}/api/auth/login`;

  return this.http.post<AuthResponse>(urlLogin, body, { headers: this.headers }).pipe(
    map((resp) => {
      const token = resp.access_token;
      localStorage.setItem('auth_token_bodegaarcana', token);
      return token; // o llama a otro endpoint /me si lo implementas
    }),
    catchError(this.handleError)
  );
}


  LogIn() {
    const token: any = localStorage.getItem('auth_token_bodegaarcana');
    console.log(this.helper.getTokenExpirationDate(token));
    return !this.helper.isTokenExpired(token, ValoresTokenEnum.ValorToken);
  }

  LogOut() {
    localStorage.removeItem('auth_token_bodegaarcana');
    localStorage.removeItem('titulo_menu');
    localStorage.removeItem('subtitulo_menu');    
    window.location.href = API_URL_PRINCIPAL;
  }

  TokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
