import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from './loginRequest.model';
import { CreatorResponse } from './creatorResponse.model';
import { Router } from '@angular/router';

/*@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginRequest): Observable<CreatorResponse> {
    return this.http.post<CreatorResponse>(`${this.baseUrl}/login`, payload)
    .pipe(
      tap(creator => {
        // Stocker les identifiants pour l'authentification Basic
        const basicAuth = btoa(`${payload.email}:${payload.password}`);
        localStorage.setItem('basicAuth', basicAuth);
      })
    );
}*/
//////test /////
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, payload).pipe(
      tap(response => {
        const basicAuth = btoa(`${payload.email}:${payload.password}`);
        localStorage.setItem('basicAuth', basicAuth);
        
        // Store user data based on response
        if (response.roles && response.roles.includes('ROLE_ADMIN')) {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.setItem('creatorId', response.id.toString());
          localStorage.setItem('creatorName', response.fullname);
        }
        localStorage.setItem('email', payload.email);
      })
    );
  }
////////// zidta
  isAdmin(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('isAdmin') === 'true';
    }
    return false; // Default return value when localStorage is not available
  }



  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('creatorId');
    localStorage.removeItem('creatorName');
    localStorage.removeItem('basicAuth'); 
    // Rediriger vers login
    this.router.navigate(['/login']);
  }
  getAuthHeaders() {
    const auth = localStorage.getItem('basicAuth');
    if (auth) {
      console.log("En-tête d'authentification utilisé:", `Basic ${auth}`); // Pour déboguer
      return new HttpHeaders({
        'Authorization': `Basic ${auth}`
      });
    }
    return new HttpHeaders();
  }
}
/*
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginRequest): Observable<any> {
    // Try creator login first
    return this.http.post<CreatorResponse>(`${this.baseUrl}/auth/login`, payload)
      .pipe(
        tap(creator => {
          // Store credentials for Basic auth
          const basicAuth = btoa(`${payload.email}:${payload.password}`);
          localStorage.setItem('basicAuth', basicAuth);
          localStorage.setItem('userType', 'creator');
          localStorage.setItem('creatorId', creator.id.toString());
          localStorage.setItem('creatorName', creator.fullname);
          localStorage.setItem('email', payload.email);
          localStorage.setItem('password', payload.password);
        }),
        catchError(error => {
          // If creator login fails, try admin login
          return this.adminLogin(payload);
        })
      );
  }

  adminLogin(payload: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/login`, payload)
      .pipe(
        tap(admin => {
          // Store admin credentials
          const basicAuth = btoa(`${payload.email}:${payload.password}`);
          localStorage.setItem('basicAuth', basicAuth);
          localStorage.setItem('userType', 'admin');
          localStorage.setItem('adminId', admin.id.toString());
          localStorage.setItem('email', payload.email);
          localStorage.setItem('password', payload.password);
        }),
        catchError(error => {
          // Both login attempts failed
          return throwError(() => new Error('Authentication failed'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('creatorId');
    localStorage.removeItem('creatorName');
    localStorage.removeItem('adminId');
    localStorage.removeItem('userType');
    localStorage.removeItem('basicAuth');
    
    // Redirect to login
    this.router.navigate(['/login']);
  }

  getAuthHeaders() {
    const auth = localStorage.getItem('basicAuth');
    if (auth) {
      return new HttpHeaders({
        'Authorization': `Basic ${auth}`
      });
    }
    return new HttpHeaders();
  }

  getUserType(): string {
    return localStorage.getItem('userType') || '';
  }

  isAdmin(): boolean {
    return this.getUserType() === 'admin';
  }

  isCreator(): boolean {
    return this.getUserType() === 'creator';
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  // Modified login method to handle both creators and admins
  login(payload: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, payload).pipe(
      tap(user => {
        // Store credentials for Basic Authentication
        const basicAuth = btoa(`${payload.email}:${payload.password}`);
        localStorage.setItem('basicAuth', basicAuth);
        
        // Store user details based on role
        if (user.roles && user.roles.includes('ROLE_ADMIN')) {
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('adminId', user.id.toString());
        } else {
          localStorage.setItem('creatorId', user.id.toString());
          localStorage.setItem('creatorName', user.fullname);
        }
        
        localStorage.setItem('email', payload.email);
      })
    );
  }

  logout(): void {
    // Clear all stored items
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('creatorId');
    localStorage.removeItem('creatorName');
    localStorage.removeItem('adminId');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('basicAuth'); 
    
    // Redirect to login
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): HttpHeaders {
    const auth = localStorage.getItem('basicAuth');
    if (auth) {
      console.log("Authentication header used:", `Basic ${auth}`); // For debugging
      return new HttpHeaders({
        'Authorization': `Basic ${auth}`
      });
    }
    return new HttpHeaders();
  }

  // Additional helper methods
  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getCurrentUserId(): string | null {
    if (this.isAdmin()) {
      return localStorage.getItem('adminId');
    }
    return localStorage.getItem('creatorId');
  }

  getCurrentUserRole(): string {
    return this.isAdmin() ? 'admin' : 'creator';
  }
}*/