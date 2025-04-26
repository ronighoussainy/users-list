import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user-card',
  imports: [
    MatCardTitle,
    RouterLink,
    MatCardSubtitle,
    MatCardContent,
    MatCard
  ],
  standalone:true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: User;
}
