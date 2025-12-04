import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-app-header',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.scss', 'app-header.tw.css']
})
export class AppHeader {
  readonly appTitle = 'My Fridge';
}
