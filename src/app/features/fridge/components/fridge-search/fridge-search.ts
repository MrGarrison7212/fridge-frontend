import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-fridge-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fridge-search.html',
  styleUrls: ['./fridge-search.scss', './fridge-search.tw.css'],
})
export class FridgeSearch {
  search = input<string>('');

  readonly searchChange = output<string>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
