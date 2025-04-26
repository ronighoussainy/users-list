import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, finalize} from 'rxjs/operators';
import {LoadingService} from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.startLoading();

    return next.handle(request).pipe(
      finalize(() => {
        // Stop loading when the request completes (success or error)
        this.loadingService.stopLoading();
      })
    );
  }
}
