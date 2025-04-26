import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-details',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    NgIf
  ],
  standalone:true,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent  implements OnInit {
  user :any;
  errorMessage = '';
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = parseInt(idParam, 10);
        this.loadUser();
      } else {
        this.errorMessage = 'User ID not provided';
      }
    });
  }

  loadUser(): void {
    this.errorMessage = '';
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load user details. Please try again.';
        console.error('Error loading user:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

