import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail-component',
  standalone: true,
  imports: [],
  templateUrl: './course-detail-component.component.html',
  styleUrl: './course-detail-component.component.css'
})
export class CourseDetailComponentComponent {
  course: any;
  lessons: any[] = [];
  courseId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // קבלת ה-ID של הקורס מהנתיב
    this.courseId = this.route.snapshot.paramMap.get('id');

    if (this.courseId) {
      // קבלת פרטי הקורס
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (data) => (this.course = data),
        error: (err) => console.error('שגיאה בטעינת הקורס', err)
      });

      // קבלת השיעורים של הקורס
      this.courseService.getLessons(this.courseId).subscribe({
        next: (data) => (this.lessons = data),
        error: (err) => console.error('שגיאה בטעינת השיעורים', err)
      });
    }
  }
}

