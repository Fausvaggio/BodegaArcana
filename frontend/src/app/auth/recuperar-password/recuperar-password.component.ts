import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';

const CLIENT_NAME = environment.clientName;

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {
  clientName: string = CLIENT_NAME;
  dataFormGroup: FormGroup;
  spinner = inject(NgxSpinnerService);
  constructor(private router: Router) {
    this.dataFormGroup = new FormGroup({
      inputUsuario: new FormControl('', [Validators.required]),
      inputPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  /// Autor: Fausto Danilo Esthela Espinoza
  /// Fecha: 11/04/2024
  /// Versión: 1.0
  /// <summary>
  ///  Permite resumir al control para el interfaz.
  /// </summary>
  get Controls() {
    return this.dataFormGroup.controls;
  }
}
