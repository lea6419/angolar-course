import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-student-course-list',
  standalone: true,
  imports: [],
  templateUrl: './student-course-list.component.html',
  styleUrl: './student-course-list.component.css'
})
export class StudentCourseListComponent {
 courses: any[] = [];
  userId: any;
  message: string = '';

  // enrolledLessons: any[] = [];
  constructor(private courseService: CourseService, private router: Router, private authService: AuthService) {console.log(this.courses);
  }

  // constructor(private courseService: CourseService, private router: Router, authService: AuthService  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data: any) => {
        this.courses = data;
        console.log('קורסים שהתקבלו:', this.courses);
      },
      error: (err: any) => console.error('שגיאה בטעינת הקורסים', err)
    });
  }

  

  enrollInCourse(courseId: string) {
  console.log("enroll", courseId);
  
  this.userId=this.authService.getId();
  console.log(this.userId);
  
  this.courseService.enrollStudentInCourse(courseId, this.userId).subscribe(
  () => {
    this.message = '✅ עזבת את הקורס בהצלחה!';
    this.courses = this.courses.filter(course => course.id !== courseId);
    setTimeout(() => (this.message = ''), 3000);
  },
  (error) => {
    this.message = '❌ שגיאה בעזיבת הקורס';
    setTimeout(() => (this.message = ''), 3000);
    console.error(error);
  });

}
leaveCourse(courseId: string,) {
  console.log("enroll", courseId);
  
  this.userId=this.authService.getId();
  console.log(this.userId);
  this.courseService.unenrollStudentInCourse(courseId,this.userId).subscribe(
    () => {
      this.message = '✅ עזבת את הקורס בהצלחה!';
      this.courses = this.courses.filter(course => course.id !== courseId);
      setTimeout(() => (this.message = ''), 3000);
    },
    (error) => {
      this.message = '❌ שגיאה בעזיבת הקורס';
      setTimeout(() => (this.message = ''), 3000);
      console.error(error);
    }
  );
}



}