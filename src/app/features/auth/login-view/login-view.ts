import {Component, EventEmitter, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, Routes} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [CommonModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login-view.html',
  styleUrls: ['./login-view.scss', './login-view.tw.css']
})
export class LoginView {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly username = signal('testuser');
  readonly password = signal('testuser123');

  readonly isLoading = this.authService.isLoading;
  readonly errorMessage = this.authService.errorMessage;

  onUsernameChange(value: string) {
    this.username.set(value);
  }

  onPasswordChange(value: string) {
    this.password.set(value);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const username = this.username();
    const password = this.password();

    if (!username || !password) {
      this.authService.setError("Username and password are required");
      return
    }

    this.authService.login(username, password).subscribe({
      next: () => {
        void this.router.navigate(['/app']);
      },
      error: () => {
        this.authService.setError("Invalid credentials or server error");
      },
    });
  }
}
