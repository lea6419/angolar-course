import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
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
          next: (res: any) => {
            // נניח שהשרת מחזיר token אחרי הרשמה
            this.authService.saveToken(res.token);
            // מעבר למסך בית/קורסים
            this.router.navigate(['/courses']);
          },
          error: (err: any) => {
            console.error('Registration failed', err);
            // טיפול בשגיאה
          }
        });
    }
  }
}

