import {Component, computed, inject, signal} from '@angular/core';
import {FridgeItemHttpService} from '../services/fridge-item-http.service';
import {FridgeItem} from '../interface/fridge-item';
import {CommonModule} from '@angular/common';
import {FridgeTable} from '../components/fridge-table/fridge-table';
import {FridgeSearch} from '../components/fridge-search/fridge-search';


@Component({
  selector: 'app-fridge-view',
  standalone: true,
  imports: [CommonModule, FridgeTable, FridgeSearch],
  templateUrl: './fridge-view.html',
  styleUrls: ['./fridge-view.scss', "./fridge-view.tw.css"]
})
export class FridgeView {
  private readonly http = inject(FridgeItemHttpService);

  private readonly _items = signal<FridgeItem[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly items = computed(() => this._items());

  readonly search = signal('');

  readonly filteredItems = computed(() => {
    const searchText = this.search().toLowerCase().trim();
    if (!searchText) {
      return this._items();
    }
    return this._items().filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
  });

  constructor() {
    this.reload();
  }

  reload(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.getAll().subscribe({
      next: (items) => {
        this._items.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load fridge items.');
        this.isLoading.set(false);
      },
    });
  }

  onAddClick(): void {
    window.alert('Add item form coming soon 🙂');
  }

  onSearchChange(value: string): void {
    this.search.set(value);
  }
}
