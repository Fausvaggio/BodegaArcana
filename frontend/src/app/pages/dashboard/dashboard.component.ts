import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  
  ngOnInit(): void {
  
  }
}
