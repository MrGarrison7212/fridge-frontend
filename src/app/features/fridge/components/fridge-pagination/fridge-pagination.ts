import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fridge-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fridge-pagination.html',
  styleUrls: ['./fridge-pagination.scss', './fridge-pagination.tw.css'],
})
export class FridgePagination {
  @Input() page = 0;        // 0-based, kao kod tebe
  @Input() totalPages = 0;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onPrevClick(): void {
    this.prev.emit();
  }

  onNextClick(): void {
    this.next.emit();
  }
}
