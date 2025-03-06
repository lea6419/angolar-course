import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { lesson } from '../../model/lesson';
import { log } from 'console';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [ ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule,
   FormsModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})



  export class LessonFormComponent implements OnInit {
    isEditMode = false;
  courseId: string | null = null;
  lesson:lesson= new lesson(0,0,'', '')
  LessonId: string | null = null;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseid');
    this.LessonId = this.route.snapshot.paramMap.get('lessonid');
    console.log(this.LessonId);
    console.log(this.courseId);
    
    
    if (this.courseId && this.LessonId) {
        this.isEditMode = true;
        this.courseService.getLessonById(this.courseId, this.LessonId).subscribe((data) => {
            this.lesson = data;
        });
    }
}

onSubmit(): void {
    console.log(this.lesson);
    if (!this.lesson.title || !this.lesson.content) {
      console.error('יש למלא את כל השדות');
      return;
    }
    if (this.isEditMode && this.courseId && this.LessonId) {
        this.courseService.updateLesson(this.courseId, this.LessonId, {
            title: this.lesson.title,
            content: this.lesson.content,
            courseId: Number(this.courseId)
        }).subscribe({
            next: () => {
                this.router.navigate(['/coursemanagement']);
            },
            error: (err) => {
                console.error('Error updating lesson:', err);
            }
        });
    } else if (this.courseId) {
      console.log(this.courseId);
      
        this.courseService.addLesson(this.courseId, {
            title: this.lesson.title,
            content: this.lesson.content,
            courseId: Number(this.courseId)
        }).subscribe({
            next: () => {
                this.router.navigate(['/coursemanagement']);
            },
            error: (err) => {
                console.error('Error adding lesson:', err);
            }
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


  

