import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fridge-sort-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fridge-sort-bar.html',
  styleUrls: ['./fridge-sort-bar.scss', './fridge-sort-bar.tw.css'],
})
export class FridgeSortBar {
  @Input() sortBy: 'storedAt' | 'bestBefore' | 'name' = 'storedAt';
  @Input() direction: 'asc' | 'desc' = 'asc';


  @Output() sort = new EventEmitter<'storedAt' | 'bestBefore' | 'name'>();
  @Output() toggleDirection = new EventEmitter<void>();

  onSortClick(field: 'storedAt' | 'bestBefore' | 'name'): void {
    this.sort.emit(field);
  }

  onToggleDirectionClick(): void {
    this.toggleDirection.emit();
  }
}
