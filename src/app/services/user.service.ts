import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, shareReplay, map } from 'rxjs/operators';
import { User, UserResponse, SingleUserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, User>();
  private pagesCache = new Map<number, UserResponse>();

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<UserResponse> {
    // Check if we have cached data for this page
    if (this.pagesCache.has(page)) {
      return of(this.pagesCache.get(page) as UserResponse);
    }

    // If not cached, fetch from API
    return this.http.get<UserResponse>(`${this.apiUrl}?page=${page}`,
      {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }}).pipe(
      tap(response => {
        // Cache the page data
        this.pagesCache.set(page, response);

        // Cache individual users
        response.data.forEach(user => {
          this.userCache.set(user.id, user);
        });
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to fetch users. Please try again later.'));
      }),
      shareReplay(1)
    );
  }

  getUserById(id: number): Observable<User> {
    // Check if we have the user in cache
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id) as User);
    }

    // If not cached, fetch from API
    return this.http.get<SingleUserResponse>(`${this.apiUrl}/${id}`,
      {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }}).pipe(
      map(response => response.data),
      tap(user => {
        // Cache the user
        this.userCache.set(user.id, user);
      }),
      catchError(error => {
        console.error(`Error fetching user with id ${id}:`, error);
        return throwError(() => new Error('User not found or network error occurred.'));
      }),
      shareReplay(1)
    );
  }

  searchUserById(id: number): Observable<User | null> {
    // Check if we have the user in cache
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id) as User);
    }

    // If not in cache, fetch from API
    return this.getUserById(id);
  }

  clearCache(): void {
    this.userCache.clear();
    this.pagesCache.clear();
  }
}
