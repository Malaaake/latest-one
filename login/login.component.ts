import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor } from '@angular/common'
import { NgIf } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LoginRequest } from './loginRequest.model';
import { CreatorResponse } from './creatorResponse.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgFor,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  action:string="Login"
  
  constructor(private fb: FormBuilder,
  private router:Router,
  private http: HttpClient , 
  private loginService:LoginService) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginPayload: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.loginService.login(loginPayload).subscribe({
        next: (creator: CreatorResponse) => {
          console.log("creator connecté:", creator);
          localStorage.setItem('creatorId', creator.id.toString());
          localStorage.setItem('creatorName', creator.fullname);
          localStorage.setItem('email', this.loginForm.value.email);
          localStorage.setItem('password', this.loginForm.value.password);
          if (creator.roles && creator.roles.includes('ROLE_ADMIN')) {
            localStorage.setItem('isAdmin', 'true');
            this.router.navigate(['/creator']);
              } else {
                this.router.navigate(['/home']);          
          }
              //mo2aqatan home khsa dkon dashboard
        },
        error: (err: any) => {
          console.error('Login error', err);
          alert('Email or password incorrect');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}


