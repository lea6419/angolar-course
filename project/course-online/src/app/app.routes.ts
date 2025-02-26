import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { roleGuard } from './guard/auth.guard';


 export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard], data: { roles: ['admin', 'teacher', 'student'] } },
    { path: 'courses', component: CoursesComponent, canActivate: [roleGuard], data: { roles: ['teacher', 'admin'] } }, // רק מורים ומנהלים
    { path: 'admin-panel', component: AdminPanelComponent, canActivate: [roleGuard], data: { roles: ['admin'] } }, // רק למנהלים
    { path: 'unauthorized', component: UnauthorizedComponent }, // דף גישה חסומה
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
 ]