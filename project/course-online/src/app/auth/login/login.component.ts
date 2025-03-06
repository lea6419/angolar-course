import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';
  
    constructor(private fb: FormBuilder, 
      private authService: AuthService,
       private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        const {  email, password } = this.loginForm.value;
      this.authService.login({email,password}).subscribe({
        next: (response) => {
          if (response.role === 'admin') {
            this.router.navigate(['/coursemanagement']);
          } else if (response.role === 'teacher') {
            this.router.navigate(['/coursemanagement']);
          } else {
            this.router.navigate(['/student-course-list']);
          }
        },
        error: (error) => {
          this.errorMessage = 'אימייל או סיסמה שגויים';
        }
      });
    }
    }
  }  