import { Routes } from '@angular/router';
import {LoginView} from './features/auth/login-view/login-view';
import {FridgeView} from './features/fridge/fridge-view/fridge-view';

export const routes: Routes = [

  {
    path: '',
    component: LoginView,
  },
  {
    path: 'app',
    component: FridgeView,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
