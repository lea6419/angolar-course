import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  getStudentCourses(userId: number | null) {
   const Courses =this.getCourses();
   Courses.subscribe((data) => {
     return data.filter((course: Course) => course.includes(userId));
   })
   console.log(Courses);
   
   return Courses
  }
  private baseUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient,private authService: AuthService) {}


/*************  ✨ Codeium Command ⭐  *************/
/******  fc762fbd-cdc7-4d31-aa18-3e1e2b090e45  *******/
  private getHeaders(): HttpHeaders {
    
    const token =this.authService.getToken(); // שליפת ה-Token מהאחסון המקומי
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /** קבלת כל הקורסים */
  getCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() });
  }

  /** קבלת קורס לפי ID */
  getCourseById(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}`, { headers: this.getHeaders() });
  }

  /** יצירת קורס חדש */
  addCourse(data: { title: string; description: string; teacherId: number }): Observable<any> {
    data.teacherId=this.authService.getId()||0;
    return this.http.post(`${this.baseUrl}`, data, { headers: this.getHeaders() });
  }

  /** עדכון קורס לפי ID */
  updateCourse(courseId: string, data: { title: string; description: string; teacherId: number }): Observable<any> {
    data.teacherId=this.authService.getId()||0;
    return this.http.put(`${this.baseUrl}/${courseId}`, data, { headers: this.getHeaders() });
  }

  /** מחיקת קורס לפי ID */
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}`, { headers: this.getHeaders() });
  }

  /** קבלת כל השיעורים בקורס מסוים */
  getLessons(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons`, { headers: this.getHeaders() });
  }

  /** קבלת פרטי שיעור לפי ID */
  getLessonById(courseId: string, lessonId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }

  /** יצירת שיעור חדש בקורס מסוים */
  addLesson(courseId: string, data: { title: string; content: string; courseId: number; }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/lessons`, data, { headers: this.getHeaders() });
  }

  
  // addCourse(data: { title: string; description: string; teacherId: number }): Observable<any> {
  //   data.teacherId=this.authService.getId()||0;
  //   return this.http.post(`${this.baseUrl}`, data, { headers: this.getHeaders() });
  // }

  /** עדכון שיעור לפי ID */
  updateLesson(courseId: string, lessonId: string, data: { title: string; content: string; courseId: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, data, { headers: this.getHeaders() });
  }

  /** מחיקת שיעור לפי ID */
  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }
  /** הוספת תלמיד לקורס */
enrollStudentInCourse(courseId: string, userId: number): Observable<any> {
  const data = { userId: userId }; // נתוני התלמיד להוספה לקורס
  return this.http.post(`${this.baseUrl}/${courseId}/enroll`, data, { headers: this.getHeaders() });
}
/** עזיבת קורס על ידי המשתמש המחובר */
unenrollStudentInCourse(courseId: string, userId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${courseId}/unenroll`, {
    headers: this.getHeaders(),
    body: { userId }, // נתוני התלמיד להוספה לקורס
  });
}
  
  

}
