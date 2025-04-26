import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap} from "rxjs";
import {UserService} from "../../services/user.service";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchId: number | null = null;
  searchResults: any = null;
  searchVisible = false;
  private searchSubject = new Subject<number>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      switchMap(id => {
        if (!id) {
          this.searchResults = null;
          return of(null);
        }
        return this.userService.getUserById(id).pipe(
          catchError(() => {
            return of(null);
          })
        );
      })
    ).subscribe(result => {
      console.log(result)
      this.searchResults = result;
      this.searchVisible = true;
    });

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        this.searchVisible = false;
      }
    });
  }

  onSearchChange(): void {
    if (this.searchId) {
      this.searchSubject.next(this.searchId);
    } else {
      this.searchResults = null;
    }
  }

  viewUser(id: number): void {
    this.router.navigate(['/user', id]);
    this.searchVisible = false;
  }
}
