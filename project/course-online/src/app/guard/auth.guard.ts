import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole(); // שליפת תפקיד המשתמש
  const requiredRoles = route.data?.['roles'] as string[]; // הרשאות נדרשות לנתיב

  if (authService.isLoggedIn() && requiredRoles.includes(userRole!)) {
    return true; // המשתמש מחובר ויש לו הרשאה
  } else {
    router.navigate(['/unauthorized']); // דף גישה חסומה
    return false;
  }
};
