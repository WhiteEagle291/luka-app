import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoginModal = false;
  
   // Output event to notify the parent component
   @Output() loginSuccess = new EventEmitter<{ luka: any; brodovi: any[] }>();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  openLogin(): void {
    this.showLoginModal = true;
  }

  closeLogin(): void {
    this.showLoginModal = false;
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.access_token);
          this.authService.setLoginState(true);
          this.closeLogin();
  
          // Notify parent component with the data
          console.log('Ships and Ports:', response.ships);
          this.loginSuccess.emit({ luka: response.luka, brodovi: response.ships });
        },
        error: (error) => {
          console.error('Error during login:', error);
        }
      });
    }
  }
 

  onLogout(): void {
    this.authService.logout();
    console.log('Logout successful');
  }
}
