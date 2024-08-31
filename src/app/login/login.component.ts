// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      shipId: [null] 
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password, shipId } = this.loginForm.value;
      this.http.post('http://localhost:3000/users', { username, password, shipId })
        .subscribe({
          next: (response) => {
            console.log('User created:', response);
          },
          error: (error) => {
            console.error('Error creating user:', error);
          }
        });
    }
  }
}
