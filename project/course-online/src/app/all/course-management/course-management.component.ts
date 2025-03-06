import { Component, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { LessonManagementComponentComponent } from "../lesson-management-component/lesson-management-component.component";
@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule, LessonManagementComponentComponent],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
  courses: any;
  lessons: any;

 
 

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses() {
    this.courseService.getCourses().subscribe({
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
    // this.selectedCourseId = this.selectedCourseId === courseId ? null : courseId;
    // this.fetchLessons(courseId);
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
  

  openAddLessonDialog() {
    this.router.navigate(['/ManagementLessons']);
    console.log('פתיחת דיאלוג להוספת שיעור');
  }


}

