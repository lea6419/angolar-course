
import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule,
  FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})

export class CourseFormComponent implements OnInit {
  course: Course = new Course(0,'', '', 0, []);
  isEditMode = false;
  courseId: string | null = null;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditMode = true;
      this.courseService.getCourseById(this.courseId).subscribe((data) => {
        this.course = data;
       
      });
    }
  }
  onSubmit(): void {
    if (!this.course.title || !this.course.description) {
      console.error('יש למלא את כל השדות');
      return;
    }
    if(this.isEditMode&&this.courseId){ 
      this.courseService.updateCourse(this.courseId,{title: this.course.title, description: this.course.description, teacherId: this.course.teacherId}).subscribe(() => {
        this.router.navigate(['/coursemanagement']);
        
      });
    } else {
      this.courseService.addCourse({title: this.course.title, description: this.course.description, teacherId: this.course.teacherId}).subscribe(() => {
        this.router.navigate(['/coursemanagement']);
      });
    }
  }

  onDelete(): void {
    if (this.courseId) {
      this.courseService.deleteCourse(this.courseId).subscribe(() => {
        this.router.navigate(['/coursemanagement']);
      });
    }
  }
}

