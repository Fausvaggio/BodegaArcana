import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { locale, loadMessages } from "devextreme/localization";
import { environment } from '../environments/environment';

const CLIENT_NAME = environment.clientName;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = CLIENT_NAME;

  constructor(private titleService: Title) {
    fetch('./dist/json/es.json').then(res => res.json())
      .then(esMessages => {
        loadMessages(esMessages);
      });
    locale(navigator.language);

    this.titleService.setTitle(this.title);
  }
}
