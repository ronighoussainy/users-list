import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../services/loading.service";
import {NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {load} from "@angular/build/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent implements OnInit {
  isLoading = true;

  constructor(private loadingService: LoadingService) {
  }

// subscribe to loading boolean change to show spinner on screen
  ngOnInit(): void {
    this.loadingService.loading$.subscribe(
      isLoading => this.isLoading = isLoading
    );
  }
}
