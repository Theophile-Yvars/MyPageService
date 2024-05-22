import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageCurriculumVitaeComponent } from './page-curriculum-vitae.component';

describe('PageCurriculumVitaeComponent', () => {
  let component: PageCurriculumVitaeComponent;
  let fixture: ComponentFixture<PageCurriculumVitaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCurriculumVitaeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCurriculumVitaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
