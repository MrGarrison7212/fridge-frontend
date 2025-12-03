import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppHeader} from './core/layout/app-header/app-header';
import {AppFooter} from './core/layout/app-footer/app-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader, AppFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fridge-frontend');
}
