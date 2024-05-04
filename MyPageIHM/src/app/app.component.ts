import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './page/components/header/header.component';
import { PageCurriculumVitaeComponent } from './page/page-curriculum-vitae/page-curriculum-vitae.component';
import { PageHomeComponent } from './page/page-home/page-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent,
    PageCurriculumVitaeComponent,
    PageHomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyPageIHM';
}
