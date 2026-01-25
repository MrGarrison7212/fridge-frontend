import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, Observable, tap, finalize} from 'rxjs';
import {AuthResponse} from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);

  private readonly _authorizationHeader = signal<string | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _errorMessage = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this._authorizationHeader() !== null);
  readonly isLoading = computed(() => this._isLoading());
  readonly errorMessage = computed(() => this._errorMessage());

  login(username: string, password: string): Observable<void> {
      this._isLoading.set(true);
      this._errorMessage.set(null);


      return this.httpClient
        .post<AuthResponse>('/api/auth/login', {username, password})
        .pipe(
          tap((response) => {
            const headerValue = `Bearer ${response.token}`;
            this._isLoading.set(false);
            this._authorizationHeader.set(headerValue);
          }),
          map(() => void 0),
          finalize(() => {
            this._isLoading.set(false);
          })
        );
  }

  logout() : void {
    this._authorizationHeader.set(null);
  }

  setError(message : string | null): void {
    this._errorMessage.set(message);
  }

  authorizationHeader(): string | null {
    return this._authorizationHeader();
  }

}
