import { Routes } from '@angular/router';
import { PageCurriculumVitaeComponent } from './page/page-curriculum-vitae/page-curriculum-vitae.component';
import { PageHomeComponent } from './page/page-home/page-home.component';
import { PageProjectsComponent } from './page/page-projects/page-projects.component';
import { PageSkillsComponent } from './page/page-skills/page-skills.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'cv', component: PageCurriculumVitaeComponent },
    { path: 'home', component: PageHomeComponent },
    { path: 'projects',  component: PageProjectsComponent },
    { path: 'skills', component: PageSkillsComponent }
];
