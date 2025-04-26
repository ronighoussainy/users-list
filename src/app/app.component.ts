import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingBarComponent} from "./components/loading-bar/loading-bar.component";
import {HeaderComponent} from "./components/header/header.component";
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarComponent, HeaderComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'users';
}
