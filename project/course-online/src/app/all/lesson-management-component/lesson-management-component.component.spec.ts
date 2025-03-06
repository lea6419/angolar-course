import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-lesson-management-component',
  standalone: true,
  imports: [   MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule],
  templateUrl: './lesson-management-component.component.html',
  styleUrl: './lesson-management-component.component.css'
})
export class CourseManagementComponent implements OnInit {
addLesson() {

}
  courses: any;
  lessons: any;
  coursId:string | null | undefined;

 
 

  constructor(private courseService: CourseService, private router: Router) {}
  ngOnInit(): void {
    this.coursId=this.router.
    this.loadLesson();
  }

  loadLesson() {
    this.courseService.getLessons(this.coursId).subscribe({
      next: (data) => (this.courses = data),
      error: (err) => console.error('שגיאה בטעינת הקורסים', err)
    });
  }
  navigateToAddCourse(): void {
    this.router.navigate(['/course-form']);
  }
  
  deleteCourse(courseId: string) {
    console.log('מוחקת קורס עם ID:', courseId);
    if (confirm('האם אתה בטוח שברצונך למחוק את הקורס?')) {
      this.courseService.deleteCourse(courseId).subscribe(() => {
        console.log('הקורס נמחק בהצלחה');
        this.loadCourses(); // רענון לאחר מחיקה
      }, (error) => {
        console.error('שגיאה במחיקת הקורס:', error);
      });
    }
  }
  selectedCourseId: string | null = null;
  editCourse(courseId: string) {
    this.router.navigate(['/course-form', courseId]);
  }
  toggleLessons(courseId: string) {
    this.selectedCourseId = this.selectedCourseId === courseId ? null : courseId;
    this.fetchLessons(courseId);
  }

  fetchLessons(courseId: string) {
    // הדמיית שליפת שיעורים מהשרת
    this.lessons = this.courseService.getLessons(courseId);
    
    
  }

  editLesson(lessonId: string) {
    this.router.navigate(['/ManagementLessons', lessonId]);
    console.log('עריכת שיעור', lessonId);
  }

  deleteLesson(lessonId: string) {
    console.log('מחיקת שיעור', lessonId);
  }




}

