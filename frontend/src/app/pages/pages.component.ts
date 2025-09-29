import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiderbarComponent } from '../shared/siderbar/siderbar.component';
import { SiderbarMobileComponent } from '../shared/siderbar-mobile/siderbar-mobile.component';
import { TopBarComponent } from '../shared/top-bar/top-bar.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, SiderbarComponent, SiderbarMobileComponent, TopBarComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

}
