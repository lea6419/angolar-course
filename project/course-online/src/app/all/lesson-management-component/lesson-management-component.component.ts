import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-lesson-management-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,RouterModule],
  templateUrl: './lesson-management-component.component.html',
  styleUrl: './lesson-management-component.component.css'
})
export class LessonManagementComponentComponent implements OnInit {
  constructor(private courseService: CourseService, private router: Router) {}
  @Input() courseId: string ='';
  lessons: any[] = [];


  ngOnInit(): void {
    this.loadLessons();
  }
  
  addLesson() {
    this.router.navigate(['/lesson-form', this.courseId]);
    console.log( this.courseId);
  }
  editLesson(lessonId: string, courseId: string) {
    console.log(lessonId, "ls", courseId);
    
    if (lessonId && courseId) {
      this.router.navigate(['/lesson-form', courseId, lessonId]);
    } else {
      console.error('שיעור לא נמצא');
    }
  }
  
  
  
 

  loadLessons() {
    this.courseService.getLessons(this.courseId).subscribe({
      next: (data) => {
        this.lessons = data;
        console.log('שיעורים שהתקבלו:', this.lessons);
      },
      error: (err) => console.error('שגיאה בטעינת השיעורים', err)
    });
  }
  

  deleteLesson(lessonId: string, courseId: string) {
    if (lessonId && confirm('האם אתה בטוח שברצונך למחוק את השיעור?')) {
      this.courseService.deleteLesson(courseId, lessonId).subscribe({
        next: () => {
          console.log("שיעור נמחק בהצלחה");
          this.loadLessons();  // טוען את השיעורים מחדש לאחר המחיקה
        },
        error: (err) => console.error('שגיאה במחיקת שיעור', err)
      });
    } else {
      console.error('לא נמצא ID של שיעור');
    }
  }
  
}



