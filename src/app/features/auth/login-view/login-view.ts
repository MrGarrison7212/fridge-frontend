import {Component, EventEmitter, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, Routes} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [CommonModule],
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
