import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { roleGuard } from './guard/auth.guard';
import { CourseManagementComponent } from './all/course-management/course-management.component';
import { HomeComponent } from './all/home/home.component';
import { CourseFormComponent } from './all/course-form/course-form.component';
import { LessonManagementComponentComponent } from './all/lesson-management-component/lesson-management-component.component';
import { LessonFormComponent } from './all/lesson-form/lesson-form.component';
import { StudentCourseListComponent } from './all/student-course-list/student-course-list.component';


 export const routes: Routes = [
   { path: 'course-form/:id', component: CourseFormComponent }, // עריכת קורס קיים 
   { path: 'course-form', component: CourseFormComponent , canActivate: [roleGuard], data: { roles: ['admin', 'teacher']  }},
    { path: 'coursemanagement', component: CourseManagementComponent, canActivate: [roleGuard], data: { roles: ['admin', 'teacher', 'student'] } },
    // { path: 'courses', component: CoursesComponent, canActivate: [roleGuard], data: { roles: ['teacher', 'admin','student'] } }, // רק מורים ומנהלים
    // { path: 'admin-panel', component: AdminPanelComponent, canActivate: [roleGuard], data: { roles: ['admin'] } }, // רק למנהלים
    // { path: 'course/:id', component: CoursesComponent },
    // { path: 'unauthorized', component: UnauthorizedComponent }, // דף גישה חסומה
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: HomeComponent },
 {path: 'ManagementLessons/:id', component: LessonManagementComponentComponent , canActivate: [roleGuard], data: { roles: ['admin', 'teacher'] }},
 {path: 'student-course-list', component: StudentCourseListComponent , canActivate: [roleGuard], data: { roles: ['admin', 'teacher', 'student'] }},

 
 {path: 'lesson-form/:courseid', component: LessonFormComponent , canActivate: [roleGuard], data: { roles: ['admin', 'teacher'] }},
 {path: 'lesson-form/:courseid/:lessonid', component: LessonFormComponent , canActivate: [roleGuard], data: { roles: ['admin', 'teacher'] }}

    
 ]