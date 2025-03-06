
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private id: number | null = null;
  constructor(private http: HttpClient) {}


  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((response: any) => {
        this.id = response.id;
        this.saveToken(response.token);
        this.saveUserRole(response.role); // שמירת ה-Role
        this.id = response.userId;
        console.log(response);
      })
    );
  }
  
  private saveUserRole(role: string) {
    localStorage.setItem('role', role);
  }
  
  register(data: { name: string; email: string; password: string,role:string }): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      tap((response: any) => {
        this.id = response.id;
        this.saveToken(response.token);
        this.saveUserRole(response.role); // שמירת ה-Role
        this.id = response.userId;
        console.log(response);
        
      })
    );
    
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
  
  // פונקציה לשמירת טוקן
  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  // פונקציה לשליפת טוקן
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // פונקציה לבדיקת האם המשתמש מחובר
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('role'); // הסרת ה-Role
  }
  


  getId(): number | null {
    return this.id;
  }

  // קבלת כל השיעורים בקורס מסוים
  // getLessons(courseId: number, token: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${courseId}/lessons`, { headers: this.getAuthHeaders(token) });
  // }

  // // קבלת פרטי שיעור לפי ID
  // getLessonById(courseId: number, lessonId: number, token: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getAuthHeaders(token) });
  // }

  // // יצירת שיעור חדש בקורס מסוים (למורים)
  // createLesson(courseId: number, data: Lesson, token: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${courseId}/lessons`, data, { headers: this.getAuthHeaders(token) });
  // }

  // // עדכון שיעור לפי ID (למורים)
  // updateLesson(courseId: number, lessonId: number, data: Lesson, token: string): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, data, { headers: this.getAuthHeaders(token) });
  // }

  // // מחיקת שיעור לפי ID (למורים)
  // deleteLesson(courseId: number, lessonId: number, token: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getAuthHeaders(token) });
  // }
}
