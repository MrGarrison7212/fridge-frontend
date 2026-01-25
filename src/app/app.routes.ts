import { Routes } from '@angular/router';
import {LoginView} from './features/auth/login-view/login-view';
import {FridgeView} from './features/fridge/fridge-view/fridge-view';
import {authGuard} from './core/auth/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: LoginView,
  },
  {
    path: 'app',
    component: FridgeView,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];
