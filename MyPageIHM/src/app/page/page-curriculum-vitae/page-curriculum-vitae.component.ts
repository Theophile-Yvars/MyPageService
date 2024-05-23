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
    { name: 'Polytech Nice Sophia', degree: 'Diplôme d\'ingénieur en informatique : Mineur Architecture logiciel', startDate: '2021', endDate: '2024' },
    { name: 'Université de Perpignan Via Domitia', degree: 'Diplôme licence informatique et mathématique', startDate: '2019', endDate: '2021' },
    { name: 'IUT Nîmes et IUT 1 Grenoble', degree: 'Diplôme DUT Génie Electrique et Informatique Industrielle', startDate: '2017', endDate: '2019' },
    { name: 'CFAI Formavenir Thyez', degree: 'Diplôme BAC Pro Maintenance des Equipements Industriels', startDate: '2016', endDate: '2017' },
    { name: 'Lycée des métiers Porte des Alpes', degree: 'CAP Electricien', startDate: '2015', endDate: '2016' },
    { name: 'CFA Compagnons du Tour de France', degree: 'CAP Charpente', startDate: '2013', endDate: '2014' },
    { name: 'MFR Vulbens', degree: 'BAC Pro Métiers du commerce et de la vente', startDate: '2010', endDate: '2012' },
    { name: 'MFR Vulbens', degree: 'CAP Equipier Polyvalent du Commerce', startDate: '2008', endDate: '2010' },
  ];
}
