import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {PaginationComponent} from "../../components/pagination/pagination.component";
import {NgForOf, NgIf} from "@angular/common";
import {UserCardComponent} from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-user-list',
  imports: [
    PaginationComponent,
    NgIf,
    NgForOf,
    UserCardComponent
  ],
  standalone:true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  users: User[] = [];
  currentPage = 1;
  totalPages = 0;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.errorMessage = '';
    this.userService.getUsers(this.currentPage).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalPages = response.total_pages;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load users. Please try again.';
        console.error('Error loading users:', error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
