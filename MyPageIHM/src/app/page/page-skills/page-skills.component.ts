import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-page-skills',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './page-skills.component.html',
  styleUrl: './page-skills.component.css'
})
export class PageSkillsComponent {

}
