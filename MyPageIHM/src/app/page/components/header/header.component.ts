import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import {RouterModule} from "@angular/router";
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    RouterModule,
    NgOptimizedImage,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isHovering = false;

  constructor(private router: Router) {
    
  }

  public isMyRoute(url:String){
    return this.router.url === url
  }

  public gotToPage(page:String) {
    this.router.navigate([page]);
  };

  onMouseOver() {
    this.isHovering = true;
  }

  onMouseLeave() {
    this.isHovering = false;
  }
}