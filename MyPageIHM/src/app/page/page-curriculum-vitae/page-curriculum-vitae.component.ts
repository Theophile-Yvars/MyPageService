import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { SchoolComponent } from '../components/school/school.component';
import { SchoolData } from '../../interfaces/school.interface';

@Component({
  selector: 'app-page-curriculum-vitae',
  standalone: true,
  imports: [
    HeaderComponent,
    SchoolComponent,
    CommonModule
  ],
  templateUrl: './page-curriculum-vitae.component.html',
  styleUrl: './page-curriculum-vitae.component.css'
})

export class PageCurriculumVitaeComponent {
  schools: SchoolData[] = [
    { name: 'École 1', degree: 'Diplôme 1', startDate: '2010', endDate: '2012' },
    { name: 'École 2', degree: 'Diplôme 2', startDate: '2012', endDate: '2014' },
  ];
}
