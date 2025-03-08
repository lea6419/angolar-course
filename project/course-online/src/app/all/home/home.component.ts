import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ShowIfLoggedInDirective } from '../../directive/show-if-logged-in.directive';
import { StatusPipe } from "../../app/pipes/status.pipe";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ShowIfLoggedInDirective, StatusPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  courses: any[] = [];
today: Date = new Date();
isLoggedIn: any;
userRole: any;
 
  constructor(private courseService: CourseService,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPopularCourses();
    this.isLoggedIn=this.authService.isLoggedIn();
    this.userRole=this.authService.getUserRole();
  }

  loadPopularCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courses = data.slice(0, 3)), // הצגת 3 קורסים ראשונים
      error: (err) => console.error('שגיאה בטעינת הקורסים', err)
    });
  }
  navigateToStudentDashboard(): void {
    this.router.navigate(['/student-dashboard']);
  }

  navigateToTeacherDashboard(): void {
    this.router.navigate(['/teacher-dashboard']);
  }

  navigateToCourse(courseId: string): void {
    // מעבר למסך קורס
    this.router.navigate(['/course', courseId]);
  }
  navigateToRegister(): void {
    // מעבר למסך הרשמה
    this.router.navigate(['/register']);
  }
  navigateToLogin(): void {
    // מעבר למסך התחברות
    this.router.navigate(['/login']);
  }
}

