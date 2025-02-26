
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}


  login(data: {  email: string; password:string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  register(data: { name: string; email: string; password: string,role:string }): Observable<any> {
    
    return  this.http.post(`${this.baseUrl}/register`, data);
   
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
