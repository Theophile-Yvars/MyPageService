import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-page-projects',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './page-projects.component.html',
  styleUrl: './page-projects.component.css'
})
export class PageProjectsComponent {

}
