import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, forkJoin, catchError, of, map } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiResponse, AuthResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.loadProfile();
    }
  }

  register(data: any): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/register`, data)
      .pipe(tap(response => {
        if (response.success) {
          this.setToken(response.data.accessToken);
          this.currentUserSubject.next(response.data.user);
        }
      }));
  }

  login(email: string, password: string): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/login`, { email: email, password: password })
      .pipe(tap(response => {
        if (response.success) {
          this.setToken(response.data.accessToken);
          this.currentUserSubject.next(response.data.user);
        }
      }));
  }

  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/profile`);
  }

  createProfile(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/auth/profile`, data);
  }

  loadProfile(): void {
    this.getProfile().subscribe({
      next: (response) => {
        if (response.success) {
          this.currentUserSubject.next(response.data);
          // Sincronizar flags de perfiles consultando /companies/my y /providers/my
          this.refreshUserProfiles().subscribe();
        }
      },
      error: () => this.logout()
    });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  refreshUserProfiles(): Observable<void> {
    return forkJoin({
      company: this.http.get<ApiResponse<any>>(`${this.apiUrl}/companies/my`).pipe(
        catchError(() => of(null))
      ),
      provider: this.http.get<ApiResponse<any>>(`${this.apiUrl}/providers/my`).pipe(
        catchError(() => of(null))
      )
    }).pipe(
      tap(({ company, provider }) => {
        const current = this.currentUserSubject.value;
        if (current) {
          this.currentUserSubject.next({
            ...current,
            hasCompanyProfile: !!company?.success,
            hasProviderProfile: !!provider?.success
          });
        }
      }),
      map(() => void 0)
    );
  }

  updateUserType(userType: 'COMPANY' | 'PROVIDER'): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/users/me/type`, { userType }).pipe(
      tap(() => {
        const current = this.currentUserSubject.value;
        if (current) {
          this.currentUserSubject.next({ ...current, primaryType: userType });
        }
      })
    );
  }

  updateProfile(data: { firstName: string; lastName: string; username: string; email: string; phone: string }): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/me`, data).pipe(
      tap(response => {
        if (response.success) {
          this.currentUserSubject.next(response.data);
        }
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/auth/change-password`, { oldPassword, newPassword, newPasswordConfirm });
  }

  forgotPassword(email: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string, newPasswordConfirm: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/auth/reset-password`, { token, newPassword, newPasswordConfirm });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
