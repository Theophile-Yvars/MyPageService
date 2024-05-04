import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-page-curriculum-vitae',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './page-curriculum-vitae.component.html',
  styleUrl: './page-curriculum-vitae.component.css'
})
export class PageCurriculumVitaeComponent {

}
