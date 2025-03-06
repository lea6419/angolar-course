import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role:['',Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password,role } = this.registerForm.value;
      this.authService.register({ name, email, password, role })
        .subscribe({ 
          next: (response) => {
            if (response.role === 'admin') {
              this.router.navigate(['/coursemanagement']);
            } else if (response.role === 'teacher') {
              this.router.navigate(['/coursemanagement']);
            } else {
              this.router.navigate(['/student-course-list']);
            }
          },
          error: (err: any) => {
            console.error('Registration failed', err);
            // טיפול בשגיאה
          }
        });
    }
  }
}

