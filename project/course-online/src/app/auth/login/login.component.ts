import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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

        next: (response:any) => {
          localStorage.setItem('token', response.token);
          // this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'אימייל או סיסמה שגויים';
        }
      });
    }
    }
  }  