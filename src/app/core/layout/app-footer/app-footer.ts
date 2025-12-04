import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-app-footer',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app-footer.html',
  styleUrls: ['./app-footer.scss', 'app-footer.tw.css']
})
export class AppFooter {
  readonly currentYear = new Date().getFullYear();
  readonly appTitle = 'My Fridge';
}
