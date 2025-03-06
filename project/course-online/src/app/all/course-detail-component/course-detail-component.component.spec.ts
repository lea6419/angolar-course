import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailComponentComponent } from './course-detail-component.component';

describe('CourseDetailComponentComponent', () => {
  let component: CourseDetailComponentComponent;
  let fixture: ComponentFixture<CourseDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
