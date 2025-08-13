import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login.component';

export const routes: Routes = [
    {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login' // ou 'pagina-nao-encontrada' se existir
  }
];
