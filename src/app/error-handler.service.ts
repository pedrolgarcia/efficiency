import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { AlertService } from './shared/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  handleError(error: HttpErrorResponse | any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 500 && (error.url.includes('refresh') || error.message === 'token inválido')) {
        this.goToLogin();
      }

      const alert = this.injector.get(AlertService);
      alert.header = error.error.error;
      alert.message = error.error.message;
      alert.buttons = ['Fechar'];
      alert.presentAlert();
    }
    super.handleError(error);
  }

  goToLogin(): void {
    const router = this.injector.get(Router);
    localStorage.clear();
    router.navigate(['/login']);
  }
}
