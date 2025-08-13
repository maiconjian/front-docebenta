import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Angular 20+
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { routes } from './app.routes'; // seu arquivo de rotas
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter,
          allowedDomains: environment.tokenWhitelistedDomains,
          disallowedRoutes: environment.tokenBlacklistedRoutes
        }
      }),
      // se precisar importar outros módulos antigos que não são standalone
    ),
    MessageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};
