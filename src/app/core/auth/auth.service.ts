import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, Observable, tap, finalize} from 'rxjs';
import {AuthResponse} from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly STORAGE_KEY = 'fridge_jwt_token';

  private readonly _authorizationHeader = signal<string | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _errorMessage = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this._authorizationHeader() !== null);
  readonly isLoading = computed(() => this._isLoading());
  readonly errorMessage = computed(() => this._errorMessage());

  constructor() {
    const storedToken = localStorage.getItem(this.STORAGE_KEY);
    if(storedToken) {
      this._authorizationHeader.set(`Bearer ${storedToken}`);
    }
  }


  login(username: string, password: string): Observable<void> {
      this._isLoading.set(true);
      this._errorMessage.set(null);


      return this.httpClient
        .post<AuthResponse>('/api/auth/login', {username, password})
        .pipe(
          tap((response) => {
            const token = response.token
            const headerValue = `Bearer ${token}`;

            localStorage.setItem(this.STORAGE_KEY, token);
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
    localStorage.removeItem(this.STORAGE_KEY);
  }

  setError(message : string | null): void {
    this._errorMessage.set(message);
  }

  authorizationHeader(): string | null {
    return this._authorizationHeader();
  }

}
