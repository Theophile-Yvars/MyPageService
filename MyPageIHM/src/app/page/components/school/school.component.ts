import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})

export class SchoolComponent {
  @Input() name: string = '';;
  @Input() degree: string = '';;
  @Input() startDate: string = '';;
  @Input() endDate: string = '';;
}

